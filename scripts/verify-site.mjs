import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const ROOT_DIR = process.cwd();
const SITE_ORIGIN = 'https://lab.dmxsan.dev';
const OG_IMAGE_URL = `${SITE_ORIGIN}/assets/og-image.png`;
const MAX_FILE_BYTES = 1024 * 1024;

const REQUIRED_FILES = [
  '.nojekyll',
  'CNAME',
  'AGENTS.md',
  'README.md',
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'favicon.svg',
  'favicon.ico',
  'favicon-48x48.png',
  'apple-touch-icon.png',
  'assets/styles.css',
  'assets/theme.js',
  'assets/og-image.png',
  'deforestation/index.html',
  'deforestation/bench.js',
];

const REQUIRED_TOKENS = [
  '--bg',
  '--plate',
  '--plate-2',
  '--ink',
  '--muted',
  '--line',
  '--line-strong',
  '--ndvi',
  '--ndvi-soft',
  '--nir',
  '--nir-soft',
  '--sar',
  '--sar-soft',
  '--amber',
  '--amber-soft',
];

const TEXT_EXTENSIONS = new Set([
  '.html',
  '.css',
  '.js',
  '.mjs',
  '.svg',
  '.xml',
  '.txt',
  '.md',
  '.yml',
  '.yaml',
]);
const TEXT_BASENAMES = new Set(['CNAME', 'verify', '.gitignore']);
const SOURCE_EXTENSIONS = new Set(['.html', '.css', '.js']);
const HEX_COLOR_RE = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const PILL_RADIUS_RE = /\b9999?px\b/;
const THEME_META_HEXES = new Set(['#F5F6F2', '#0F1411']);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function toPosixRel(filePath) {
  return path.relative(ROOT_DIR, filePath).split(path.sep).join('/');
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    if (entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function parsePngDimensions(buf, label) {
  if (buf.length < 24 || !buf.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error(`${label} is missing PNG header.`);
  }
  if (buf.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error(`${label} is missing IHDR chunk.`);
  }
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

function extractCssBlock(cssText, pattern) {
  const m = cssText.match(pattern);
  return m ? m[1] : null;
}

function parseTagAttrs(tag) {
  const attrs = {};
  for (const m of tag.matchAll(/([A-Za-z_:][A-Za-z0-9_.:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? '';
  }
  return attrs;
}

function collectMetaMap(html) {
  const byKey = new Map();
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseTagAttrs(m[0]);
    const key = (attrs.property || attrs.name || '').toLowerCase();
    if (key && attrs.content !== undefined) {
      byKey.set(key, attrs.content);
    }
  }
  return byKey;
}

function collectLinkTags(html) {
  const links = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    links.push(parseTagAttrs(m[0]));
  }
  return links;
}

function expectedCanonicalForHtml(relPath) {
  if (relPath === 'index.html') return `${SITE_ORIGIN}/`;
  if (relPath.endsWith('/index.html')) {
    return `${SITE_ORIGIN}/${relPath.slice(0, -'index.html'.length)}`;
  }
  return `${SITE_ORIGIN}/${relPath}`;
}

function resolveLocalPath(fromFile, rawRef) {
  const cleanRef = rawRef.split('#')[0].split('?')[0];
  if (!cleanRef) return null;
  if (cleanRef.startsWith('/')) {
    return path.resolve(ROOT_DIR, cleanRef.slice(1));
  }
  return path.resolve(path.dirname(fromFile), cleanRef);
}

async function resolveTargetExists(resolvedPath, rawRef) {
  if (!resolvedPath.startsWith(ROOT_DIR + path.sep) && resolvedPath !== ROOT_DIR) {
    return false;
  }
  const cleanRef = rawRef.split('#')[0].split('?')[0];
  if (cleanRef.endsWith('/') || cleanRef === '.') {
    return await exists(path.join(resolvedPath, 'index.html'));
  }
  if (await exists(resolvedPath)) {
    const st = await fs.stat(resolvedPath);
    if (st.isDirectory()) {
      return await exists(path.join(resolvedPath, 'index.html'));
    }
    return true;
  }
  return false;
}

async function checkRepoHygiene(allFiles) {
  const errors = [];
  for (const rel of REQUIRED_FILES) {
    if (!(await exists(path.join(ROOT_DIR, rel)))) {
      errors.push(`Missing required file: ${rel}`);
    }
  }

  for (const filePath of allFiles) {
    const rel = toPosixRel(filePath);
    if (rel === 'package.json' || rel === 'package-lock.json' || rel.startsWith('node_modules/')) {
      errors.push(`Zero-dependency violation, unexpected package artifact: ${rel}`);
    }
    const st = await fs.stat(filePath);
    if (st.size > MAX_FILE_BYTES) {
      errors.push(`File exceeds 1 MiB limit (${st.size} bytes): ${rel}`);
    }
  }

  const cnamePath = path.join(ROOT_DIR, 'CNAME');
  if (await exists(cnamePath)) {
    const raw = await fs.readFile(cnamePath, 'utf8');
    if (raw.trim() !== 'lab.dmxsan.dev') {
      errors.push(`CNAME expected "lab.dmxsan.dev", got ${JSON.stringify(raw.trim())}.`);
    }
  }

  if (errors.length) return errors;
  return `verified ${allFiles.length} tracked/workspace files, CNAME, and .nojekyll`;
}

async function checkUtf8AndEditorialRestraint(allFiles) {
  const errors = [];
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let textCount = 0;

  for (const filePath of allFiles) {
    const rel = toPosixRel(filePath);
    const ext = path.extname(filePath);
    const base = path.basename(filePath);
    if (!TEXT_EXTENSIONS.has(ext) && !TEXT_BASENAMES.has(base)) continue;

    textCount += 1;
    const buf = await fs.readFile(filePath);
    if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
      errors.push(`${rel}: contains UTF-8 BOM.`);
    }
    if (
      buf.length >= 2 &&
      ((buf[0] === 0xff && buf[1] === 0xfe) || (buf[0] === 0xfe && buf[1] === 0xff))
    ) {
      errors.push(`${rel}: contains UTF-16 BOM.`);
    }

    let text;
    try {
      text = decoder.decode(buf);
    } catch {
      errors.push(`${rel}: invalid UTF-8 byte sequence.`);
      continue;
    }

    const lines = text.split(/\r?\n/);
    let inStylesTokenBlock = false;

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const lineNo = i + 1;

      if (line.includes('\u2014')) {
        errors.push(`${rel}:${lineNo} contains forbidden em-dash character (U+2014).`);
      }

      if (!SOURCE_EXTENSIONS.has(ext) || rel.startsWith('scripts/')) continue;

      if (PILL_RADIUS_RE.test(line)) {
        errors.push(`${rel}:${lineNo} contains forbidden pill radius (999px/9999px).`);
      }

      if (rel === 'assets/styles.css') {
        if (/^(?::root|:root\[data-theme=['"]dark['"]\])\s*\{/.test(line.trim())) {
          inStylesTokenBlock = true;
          continue;
        }
        if (inStylesTokenBlock) {
          if (line.trim() === '}') inStylesTokenBlock = false;
          continue;
        }
      }

      const scanLine =
        ext === '.html'
          ? line
              .replace(/https?:\/\/[^\s"'<>]+/g, ' ')
              .replace(/\bhref\s*=\s*"#[^"]*"/gi, ' ')
          : line;

      for (const hexMatch of scanLine.matchAll(HEX_COLOR_RE)) {
        const hex = hexMatch[0].toUpperCase();
        if (
          ext === '.html' &&
          THEME_META_HEXES.has(hex) &&
          (line.includes('theme-color') || line.includes("setAttribute('content'"))
        ) {
          continue;
        }
        errors.push(`${rel}:${lineNo} contains hardcoded hex color ${hexMatch[0]}.`);
      }
    }
  }

  if (errors.length) return errors;
  return `checked ${textCount} text files (UTF-8, no BOM, zero em-dashes, token-only hex colors)`;
}

async function checkDesignTokens() {
  const errors = [];
  const cssPath = path.join(ROOT_DIR, 'assets/styles.css');
  const css = await fs.readFile(cssPath, 'utf8');

  const lightBlock = extractCssBlock(css, /:root\s*\{([\s\S]*?)\}/);
  const darkBlock = extractCssBlock(css, /:root\[data-theme=['"]dark['"]\]\s*\{([\s\S]*?)\}/);

  if (!lightBlock) errors.push('assets/styles.css is missing :root token block.');
  if (!darkBlock) errors.push("assets/styles.css is missing :root[data-theme='dark'] token block.");

  if (lightBlock && darkBlock) {
    for (const token of REQUIRED_TOKENS) {
      const re = new RegExp(`${token}\\s*:`);
      if (!re.test(lightBlock)) errors.push(`assets/styles.css :root is missing ${token}.`);
      if (!re.test(darkBlock)) {
        errors.push(`assets/styles.css :root[data-theme='dark'] is missing ${token}.`);
      }
    }
    if (!/--bg:\s*#F5F6F2\b/i.test(lightBlock) || !/--plate:\s*#E9ECE5\b/i.test(lightBlock)) {
      errors.push('assets/styles.css :root must preserve Light EO (#F5F6F2 / #E9ECE5).');
    }
    if (!/--bg:\s*#0F1411\b/i.test(darkBlock) || !/--plate:\s*#171F1A\b/i.test(darkBlock)) {
      errors.push("assets/styles.css :root[data-theme='dark'] must preserve Dark Forest (#0F1411 / #171F1A).");
    }
  }

  const themeJs = await fs.readFile(path.join(ROOT_DIR, 'assets/theme.js'), 'utf8');
  if (!themeJs.includes("'dmxsan-theme'")) {
    errors.push("assets/theme.js must use 'dmxsan-theme' localStorage key.");
  }
  if (!themeJs.includes('aria-pressed')) {
    errors.push('assets/theme.js must update aria-pressed state.');
  }

  if (errors.length) return errors;
  return `validated ${REQUIRED_TOKENS.length} Light EO / Dark Forest tokens and theme.js`;
}

async function checkHtmlStructureAndLinks(htmlFiles) {
  const errors = [];

  for (const htmlFile of htmlFiles) {
    const rel = toPosixRel(htmlFile);
    const html = await fs.readFile(htmlFile, 'utf8');

    const h1Count = (html.match(/<h1\b/gi) || []).length;
    if (h1Count !== 1) errors.push(`${rel}: expected 1 <h1>, found ${h1Count}.`);
    if (!html.includes('class="skip-link"')) errors.push(`${rel}: missing skip-link.`);
    if (!html.includes('id="main-content"')) errors.push(`${rel}: missing #main-content.`);
    if (!/<meta\s+name="theme-color"/i.test(html)) errors.push(`${rel}: missing theme-color meta.`);

    const headerMatch = html.match(/<header\b[\s\S]*?<\/header>/i);
    if (
      !headerMatch ||
      !headerMatch[0].includes('class="brand-lockup"') ||
      !headerMatch[0].includes('Lab') ||
      !headerMatch[0].includes('https://dmxsan.dev')
    ) {
      errors.push(`${rel}: missing XLab by dmxsan.dev header lockup.`);
    }

    for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
      const attrs = parseTagAttrs(m[0]);
      if (attrs.target === '_blank') {
        const relTokens = new Set((attrs.rel || '').toLowerCase().split(/\s+/).filter(Boolean));
        if (!relTokens.has('noopener') || !relTokens.has('noreferrer')) {
          errors.push(`${rel}: target="_blank" link (${attrs.href || '?'}) must include rel="noopener noreferrer".`);
        }
      }
    }

    for (const m of html.matchAll(/\b(href|src)\s*=\s*"([^"]*)"/gi)) {
      const attrName = m[1].toLowerCase();
      const rawRef = m[2];
      if (
        !rawRef ||
        rawRef.startsWith('#') ||
        rawRef.startsWith('http://') ||
        rawRef.startsWith('https://') ||
        rawRef.startsWith('mailto:') ||
        rawRef.startsWith('tel:') ||
        rawRef.startsWith('data:') ||
        rawRef.startsWith('javascript:')
      ) {
        continue;
      }

      if (rel === 'index.html' && rawRef.startsWith('/')) {
        errors.push(`index.html: local ${attrName} "${rawRef}" must be relative (./...) not root-absolute.`);
      }

      const resolved = resolveLocalPath(htmlFile, rawRef);
      if (resolved && !(await resolveTargetExists(resolved, rawRef))) {
        errors.push(`${rel}: broken local ${attrName} target "${rawRef}".`);
      }
    }

    if (rel === '404.html') {
      for (const link of collectLinkTags(html)) {
        if (link.href && !link.href.startsWith('http') && !link.href.startsWith('/')) {
          errors.push(`404.html: <link href="${link.href}"> must be root-absolute.`);
        }
      }
      for (const m of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)) {
        if (!m[1].startsWith('http') && !m[1].startsWith('/')) {
          errors.push(`404.html: <script src="${m[1]}"> must be root-absolute.`);
        }
      }
    }
  }

  if (errors.length) return errors;
  return `verified structure, relative/404 paths, and link targets across ${htmlFiles.length} HTML pages`;
}

async function checkSeoSocialAndJsonLd(htmlFiles) {
  const errors = [];

  for (const htmlFile of htmlFiles) {
    const rel = toPosixRel(htmlFile);
    const html = await fs.readFile(htmlFile, 'utf8');
    const metas = collectMetaMap(html);
    const links = collectLinkTags(html);

    if (rel === '404.html') {
      if (metas.get('robots') !== 'noindex, nofollow') {
        errors.push(`404.html: robots meta expected "noindex, nofollow", got ${JSON.stringify(metas.get('robots'))}.`);
      }
      if (links.some((l) => (l.rel || '').toLowerCase() === 'canonical')) {
        errors.push('404.html: must not declare rel="canonical".');
      }
      if (metas.has('og:url') || /<script\s+type="application\/ld\+json"/i.test(html)) {
        errors.push('404.html: must not include og:url or JSON-LD.');
      }
      continue;
    }

    const expectedCanonical = expectedCanonicalForHtml(rel);
    if (metas.get('robots') !== 'index, follow, max-image-preview:large') {
      errors.push(`${rel}: unexpected robots meta ${JSON.stringify(metas.get('robots'))}.`);
    }

    const canonical = links.find((l) => (l.rel || '').toLowerCase() === 'canonical');
    if (!canonical || canonical.href !== expectedCanonical) {
      errors.push(`${rel}: canonical expected "${expectedCanonical}", got ${JSON.stringify(canonical?.href)}.`);
    }

    for (const [k, expectedVal] of [
      ['og:site_name', 'XLab by dmxsan.dev'],
      ['og:url', expectedCanonical],
      ['og:image', OG_IMAGE_URL],
      ['og:image:width', '1200'],
      ['og:image:height', '630'],
      ['twitter:card', 'summary_large_image'],
      ['twitter:image', OG_IMAGE_URL],
    ]) {
      if (metas.get(k) !== expectedVal) {
        errors.push(`${rel}: meta "${k}" expected ${JSON.stringify(expectedVal)}, got ${JSON.stringify(metas.get(k))}.`);
      }
    }
    for (const requiredKey of ['og:type', 'og:title', 'og:description', 'twitter:title', 'twitter:description']) {
      if (!metas.get(requiredKey)) errors.push(`${rel}: missing non-empty "${requiredKey}".`);
    }

    for (const iconName of ['favicon.ico', 'favicon-48x48.png', 'favicon.svg', 'apple-touch-icon.png']) {
      if (!links.some((l) => (l.href || '').endsWith(iconName))) {
        errors.push(`${rel}: missing icon link ending in ${iconName}.`);
      }
    }

    const ldMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    if (ldMatches.length !== 1) {
      errors.push(`${rel}: expected 1 JSON-LD script, found ${ldMatches.length}.`);
    } else {
      const rawLd = ldMatches[0][1];
      if (rawLd.includes('<')) errors.push(`${rel}: raw "<" inside JSON-LD script.`);
      try {
        const parsed = JSON.parse(rawLd);
        if (parsed['@context'] !== 'https://schema.org' || !Array.isArray(parsed['@graph'])) {
          errors.push(`${rel}: JSON-LD must define @context "https://schema.org" and @graph array.`);
        }
        if (!rawLd.includes('https://dmxsan.dev/#person')) {
          errors.push(`${rel}: JSON-LD must link author/publisher to https://dmxsan.dev/#person.`);
        }
      } catch (err) {
        errors.push(`${rel}: invalid JSON-LD (${err.message}).`);
      }
    }
  }

  if (errors.length) return errors;
  return 'validated canonicals, Open Graph, Twitter cards, icons, and JSON-LD across all pages';
}

async function checkSitemapAndRobots(htmlFiles) {
  const errors = [];
  const robots = await fs.readFile(path.join(ROOT_DIR, 'robots.txt'), 'utf8');
  for (const expectedLine of ['User-agent: *', 'Allow: /', `Sitemap: ${SITE_ORIGIN}/sitemap.xml`]) {
    if (!robots.includes(expectedLine)) {
      errors.push(`robots.txt: missing "${expectedLine}".`);
    }
  }

  const sitemap = await fs.readFile(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
  if (!sitemap.includes('<urlset') || !sitemap.includes('</urlset>')) {
    errors.push('sitemap.xml: missing <urlset> envelope.');
  }
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length === 0) errors.push('sitemap.xml: contains no <loc> entries.');

  const expectedPages = new Set(
    htmlFiles
      .map((f) => toPosixRel(f))
      .filter((rel) => rel !== '404.html')
      .map((rel) => expectedCanonicalForHtml(rel)),
  );

  const seenLocs = new Set();
  for (const loc of locs) {
    if (seenLocs.has(loc)) errors.push(`sitemap.xml: duplicate <loc> "${loc}".`);
    seenLocs.add(loc);
    if (!loc.startsWith(`${SITE_ORIGIN}/`)) {
      errors.push(`sitemap.xml: <loc> "${loc}" must start with "${SITE_ORIGIN}/".`);
    } else {
      const subPath = loc.slice(SITE_ORIGIN.length + 1);
      const diskTarget = subPath.endsWith('/') || subPath === ''
        ? path.join(ROOT_DIR, subPath, 'index.html')
        : path.join(ROOT_DIR, subPath);
      if (!(await exists(diskTarget))) {
        errors.push(`sitemap.xml: <loc> "${loc}" has no target page on disk.`);
      }
    }
  }

  for (const expectedUrl of expectedPages) {
    if (!seenLocs.has(expectedUrl)) {
      errors.push(`sitemap.xml: missing indexable route "${expectedUrl}".`);
    }
  }

  if (errors.length) return errors;
  return `validated robots.txt and ${locs.length} sitemap.xml URLs`;
}

async function checkRasterBinaries() {
  const errors = [];
  for (const [rel, expW, expH] of [
    ['assets/og-image.png', 1200, 630],
    ['apple-touch-icon.png', 180, 180],
    ['favicon-48x48.png', 48, 48],
  ]) {
    try {
      const buf = await fs.readFile(path.join(ROOT_DIR, rel));
      const { width, height } = parsePngDimensions(buf, rel);
      if (width !== expW || height !== expH) {
        errors.push(`${rel}: expected ${expW}x${expH}, got ${width}x${height}.`);
      }
    } catch (err) {
      errors.push(err.message);
    }
  }

  try {
    const ico = await fs.readFile(path.join(ROOT_DIR, 'favicon.ico'));
    if (ico.length < 6 || ico.readUInt16LE(0) !== 0 || ico.readUInt16LE(2) !== 1) {
      errors.push('favicon.ico: invalid ICO header.');
    } else {
      const count = ico.readUInt16LE(4);
      if (count !== 3) {
        errors.push(`favicon.ico: expected 3 frames, found ${count}.`);
      } else {
        const frameSizes = [];
        for (let i = 0; i < count; i += 1) {
          const off = 6 + i * 16;
          const w = ico.readUInt8(off) || 256;
          const h = ico.readUInt8(off + 1) || 256;
          const size = ico.readUInt32LE(off + 8);
          const imgOff = ico.readUInt32LE(off + 12);
          const frame = ico.subarray(imgOff, imgOff + size);
          const dims = parsePngDimensions(frame, `favicon.ico frame ${i + 1}`);
          if (dims.width !== w || dims.height !== h) {
            errors.push(`favicon.ico frame ${i + 1}: directory ${w}x${h} mismatches PNG ${dims.width}x${dims.height}.`);
          }
          frameSizes.push(w);
        }
        frameSizes.sort((a, b) => a - b);
        if (frameSizes.join(',') !== '16,32,48') {
          errors.push(`favicon.ico: expected 16/32/48 sizes, got ${frameSizes.join(',')}.`);
        }
      }
    }
  } catch (err) {
    errors.push(`favicon.ico check failed: ${err.message}`);
  }

  if (errors.length) return errors;
  return 'verified PNG dimensions (og-image, apple-touch-icon, favicon-48) and 16/32/48 ICO frames';
}

async function checkJavascriptAndInlineScripts(allFiles, htmlFiles) {
  const errors = [];
  let compiledCount = 0;

  for (const filePath of allFiles) {
    if (path.extname(filePath) !== '.js') continue;
    const rel = toPosixRel(filePath);
    const code = await fs.readFile(filePath, 'utf8');
    try {
      new vm.Script(code, { filename: rel });
      compiledCount += 1;
    } catch (err) {
      errors.push(`${rel}: JS compile error (${err.message}).`);
    }
  }

  for (const htmlFile of htmlFiles) {
    const rel = toPosixRel(htmlFile);
    const html = await fs.readFile(htmlFile, 'utf8');
    for (const m of html.matchAll(/<script(?:\s+([^>]*))?>([\s\S]*?)<\/script>/gi)) {
      const attrs = (m[1] || '').toLowerCase();
      if (attrs.includes('application/ld+json') || /\bsrc\s*=/.test(attrs)) continue;
      try {
        new vm.Script(m[2], { filename: `${rel} inline` });
        compiledCount += 1;
      } catch (err) {
        errors.push(`${rel}: inline script error (${err.message}).`);
      }
    }
  }

  if (errors.length) return errors;
  return `compiled ${compiledCount} JS files and inline scripts via vm.Script`;
}

async function checkDeforestationPrototype() {
  const errors = [];
  const benchPath = path.join(ROOT_DIR, 'deforestation/bench.js');
  const benchCode = await fs.readFile(benchPath, 'utf8');

  if (!benchCode.includes('MAX_UPLOAD_BYTES')) {
    errors.push('deforestation/bench.js: missing MAX_UPLOAD_BYTES guard.');
  }

  const epochsMatch = benchCode.match(/const\s+EPOCHS\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!epochsMatch) {
    errors.push('deforestation/bench.js: could not locate EPOCHS array literal.');
  } else {
    try {
      const epochs = new vm.Script(`(${epochsMatch[1]})`, {
        filename: 'deforestation/bench.js:EPOCHS',
      }).runInNewContext(Object.create(null));

      if (!Array.isArray(epochs) || epochs.length !== 44) {
        errors.push(`deforestation/bench.js: expected 44 EPOCHS entries, got ${epochs?.length}.`);
      } else {
        for (let i = 0; i < 44; i += 1) {
          if (epochs[i]?.ep !== i + 1) {
            errors.push(`deforestation/bench.js: epoch index ${i} has ep=${epochs[i]?.ep}.`);
            break;
          }
        }
        if (epochs[16]?.lr !== 0.0001) {
          errors.push(`deforestation/bench.js: ep 17 lr expected 0.0001, got ${epochs[16]?.lr}.`);
        }
        if (epochs[33]?.vloss !== 0.1466) {
          errors.push(`deforestation/bench.js: ep 34 vloss expected 0.1466, got ${epochs[33]?.vloss}.`);
        }
        if (epochs[43]?.viou !== 0.7306 || epochs[43]?.lr !== 1e-6) {
          errors.push(
            `deforestation/bench.js: ep 44 expected viou=0.7306 & lr=1e-6, got viou=${epochs[43]?.viou}, lr=${epochs[43]?.lr}.`,
          );
        }
      }
    } catch (err) {
      errors.push(`deforestation/bench.js: failed parsing EPOCHS (${err.message}).`);
    }
  }

  const defHtml = await fs.readFile(path.join(ROOT_DIR, 'deforestation/index.html'), 'utf8');
  if (/\bsandbox\b/i.test(defHtml)) {
    errors.push('deforestation/index.html: honest-labeling violation, must not contain "sandbox".');
  }

  if (errors.length) return errors;
  return 'verified 44 notebook epochs (Ep 17/34/44), upload guard, and honest labeling';
}

async function checkIndexCardRestraint() {
  const errors = [];
  const indexHtml = await fs.readFile(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const cardMatches = [...indexHtml.matchAll(/<li\b[^>]*class="[^"]*\bproj-item\b[^"]*"[^>]*>[\s\S]*?<\/li>/gi)];

  if (cardMatches.length === 0) {
    errors.push('index.html: expected at least 1 .proj-item entry.');
  }

  const allowedMaturity = new Set(['PROTOTYPE', 'DEMO', 'TOOL']);
  cardMatches.forEach((m, idx) => {
    const block = m[0];
    const badge = block.match(/<span\s+class="maturity-badge">\s*([^<]+?)\s*<\/span>/i);
    if (!badge || !allowedMaturity.has(badge[1].trim())) {
      errors.push(`index.html card #${idx + 1}: maturity badge must be PROTOTYPE, DEMO, or TOOL.`);
    }

    const tagsBlock = block.match(/<div\s+class="uniform-tags">([\s\S]*?)<\/div>/i);
    if (!tagsBlock) {
      errors.push(`index.html card #${idx + 1}: missing .uniform-tags block.`);
      return;
    }

    const tags = [...tagsBlock[1].matchAll(/<span\s+class="u-tag">\s*([^<]+?)\s*<\/span>/gi)].map((t) =>
      t[1].trim(),
    );
    if (tags.length < 2 || tags.length > 3) {
      errors.push(`index.html card #${idx + 1}: expected 2 to 3 uniform tags, found ${tags.length}.`);
    }
    for (const tag of tags) {
      if (/★|\biou\b|%|\bstar\b|\d+\.\d+/i.test(tag)) {
        errors.push(`index.html card #${idx + 1}: tag "${tag}" must not show raw metrics or vanity stars.`);
      }
    }
  });

  if (errors.length) return errors;
  return `verified index card restraint (${cardMatches.length} entry, maturity badge + uniform neutral tags)`;
}

async function main() {
  const allFiles = await walkFiles(ROOT_DIR);
  const htmlFiles = allFiles.filter((f) => path.extname(f) === '.html');

  const checks = [
    ['Repo & Pages hygiene', () => checkRepoHygiene(allFiles)],
    ['UTF-8, BOM & editorial restraint', () => checkUtf8AndEditorialRestraint(allFiles)],
    ['Shared Design System tokens', () => checkDesignTokens()],
    ['HTML structure, links & security', () => checkHtmlStructureAndLinks(htmlFiles)],
    ['SEO, canonicals, social & JSON-LD', () => checkSeoSocialAndJsonLd(htmlFiles)],
    ['Sitemap & robots consistency', () => checkSitemapAndRobots(htmlFiles)],
    ['Raster binary integrity', () => checkRasterBinaries()],
    ['JS & inline script compilation', () => checkJavascriptAndInlineScripts(allFiles, htmlFiles)],
    ['Deforestation prototype & labeling', () => checkDeforestationPrototype()],
    ['Index card restraint', () => checkIndexCardRestraint()],
  ];

  const failures = [];
  for (let i = 0; i < checks.length; i += 1) {
    const [label, fn] = checks[i];
    const result = await fn();
    if (Array.isArray(result)) {
      console.error(`[FAIL] ${i + 1}/${checks.length} ${label}`);
      for (const err of result) {
        console.error(`  - ${err}`);
        failures.push(`${label}: ${err}`);
      }
    } else {
      console.log(`[PASS] ${i + 1}/${checks.length} ${label} (${result})`);
    }
  }

  if (failures.length > 0) {
    console.error(`\nVerification failed with ${failures.length} issue(s).`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
