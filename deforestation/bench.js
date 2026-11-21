(() => {
  // All 44 epochs verbatim from UNet-Deforestation.ipynb (Cell 16)
  const EPOCHS = [
    { ep: 1, loss: 0.3764, acc: 0.8650, rec: 0.6799, prec: 0.8952, iou: 0.4087, vloss: 0.6554, vacc: 0.7823, vrec: 0.4925, vprec: 0.6607, viou: 0.2396, lr: 0.001 },
    { ep: 2, loss: 0.2584, acc: 0.9421, rec: 0.9382, prec: 0.8954, iou: 0.5284, vloss: 0.5855, vacc: 0.8124, vrec: 0.5532, vprec: 0.7262, viou: 0.2685, lr: 0.001 },
    { ep: 3, loss: 0.2373, acc: 0.9461, rec: 0.9473, prec: 0.8986, iou: 0.5567, vloss: 0.5327, vacc: 0.8035, vrec: 0.8625, vprec: 0.6111, viou: 0.3458, lr: 0.001 },
    { ep: 4, loss: 0.2208, acc: 0.9508, rec: 0.9492, prec: 0.9091, iou: 0.5811, vloss: 0.4568, vacc: 0.8270, vrec: 0.9593, vprec: 0.6299, viou: 0.3959, lr: 0.001 },
    { ep: 5, loss: 0.2041, acc: 0.9551, rec: 0.9482, prec: 0.9213, iou: 0.6052, vloss: 0.5101, vacc: 0.7373, vrec: 0.9933, vprec: 0.5216, viou: 0.4175, lr: 0.001 },
    { ep: 6, loss: 0.1892, acc: 0.9578, rec: 0.9576, prec: 0.9206, iou: 0.6290, vloss: 0.5713, vacc: 0.6649, vrec: 0.9894, vprec: 0.4603, viou: 0.3941, lr: 0.001 },
    { ep: 7, loss: 0.1767, acc: 0.9602, rec: 0.9577, prec: 0.9270, iou: 0.6494, vloss: 0.4266, vacc: 0.7924, vrec: 0.9834, vprec: 0.5811, viou: 0.4350, lr: 0.001 },
    { ep: 8, loss: 0.1683, acc: 0.9614, rec: 0.9500, prec: 0.9367, iou: 0.6668, vloss: 0.4403, vacc: 0.7769, vrec: 0.9874, vprec: 0.5629, viou: 0.4464, lr: 0.001 },
    { ep: 9, loss: 0.1600, acc: 0.9617, rec: 0.9575, prec: 0.9311, iou: 0.6840, vloss: 0.4124, vacc: 0.7895, vrec: 0.9713, vprec: 0.5788, viou: 0.4690, lr: 0.001 },
    { ep: 10, loss: 0.1559, acc: 0.9602, rec: 0.9483, prec: 0.9348, iou: 0.6947, vloss: 0.4642, vacc: 0.7617, vrec: 0.9772, vprec: 0.5469, viou: 0.4717, lr: 0.001 },
    { ep: 11, loss: 0.1559, acc: 0.9567, rec: 0.9549, prec: 0.9199, iou: 0.7044, vloss: 0.3222, vacc: 0.8476, vrec: 0.9791, vprec: 0.6569, viou: 0.5441, lr: 0.001 },
    { ep: 12, loss: 0.1410, acc: 0.9630, rec: 0.9605, prec: 0.9321, iou: 0.7221, vloss: 0.2415, vacc: 0.9098, vrec: 0.9780, vprec: 0.7694, viou: 0.5746, lr: 0.001 },
    { ep: 13, loss: 0.1386, acc: 0.9625, rec: 0.9534, prec: 0.9365, iou: 0.7323, vloss: 0.2773, vacc: 0.8754, vrec: 0.9546, vprec: 0.7100, viou: 0.5692, lr: 0.001 },
    { ep: 14, loss: 0.1273, acc: 0.9672, rec: 0.9582, prec: 0.9454, iou: 0.7479, vloss: 0.2696, vacc: 0.8745, vrec: 0.9580, vprec: 0.7073, viou: 0.5688, lr: 0.001 },
    { ep: 15, loss: 0.1221, acc: 0.9679, rec: 0.9601, prec: 0.9458, iou: 0.7621, vloss: 0.2893, vacc: 0.8611, vrec: 0.9634, vprec: 0.6823, viou: 0.5675, lr: 0.001 },
    { ep: 16, loss: 0.1143, acc: 0.9698, rec: 0.9629, prec: 0.9484, iou: 0.7736, vloss: 0.2440, vacc: 0.8880, vrec: 0.9602, vprec: 0.7320, viou: 0.6107, lr: 0.001 },
    { ep: 17, loss: 0.1078, acc: 0.9722, rec: 0.9630, prec: 0.9551, iou: 0.7832, vloss: 0.2217, vacc: 0.9008, vrec: 0.9526, vprec: 0.7610, viou: 0.6227, lr: 0.0001 },
    { ep: 18, loss: 0.1021, acc: 0.9752, rec: 0.9659, prec: 0.9609, iou: 0.7887, vloss: 0.2000, vacc: 0.9156, vrec: 0.9453, vprec: 0.7974, viou: 0.6346, lr: 0.0001 },
    { ep: 19, loss: 0.0998, acc: 0.9762, rec: 0.9694, prec: 0.9604, iou: 0.7925, vloss: 0.1922, vacc: 0.9204, vrec: 0.9438, vprec: 0.8098, viou: 0.6411, lr: 0.0001 },
    { ep: 20, loss: 0.0975, acc: 0.9771, rec: 0.9699, prec: 0.9626, iou: 0.7961, vloss: 0.1859, vacc: 0.9235, vrec: 0.9406, vprec: 0.8191, viou: 0.6462, lr: 0.0001 },
    { ep: 21, loss: 0.0956, acc: 0.9779, rec: 0.9706, prec: 0.9643, iou: 0.7988, vloss: 0.1790, vacc: 0.9277, vrec: 0.9381, vprec: 0.8311, viou: 0.6527, lr: 0.0001 },
    { ep: 22, loss: 0.0936, acc: 0.9788, rec: 0.9718, prec: 0.9655, iou: 0.8018, vloss: 0.1721, vacc: 0.9330, vrec: 0.9345, vprec: 0.8472, viou: 0.6600, lr: 0.0001 },
    { ep: 23, loss: 0.0916, acc: 0.9796, rec: 0.9725, prec: 0.9672, iou: 0.8047, vloss: 0.1677, vacc: 0.9365, vrec: 0.9315, vprec: 0.8586, viou: 0.6655, lr: 0.0001 },
    { ep: 24, loss: 0.0896, acc: 0.9803, rec: 0.9735, prec: 0.9684, iou: 0.8076, vloss: 0.1631, vacc: 0.9398, vrec: 0.9273, vprec: 0.8709, viou: 0.6719, lr: 0.0001 },
    { ep: 25, loss: 0.0876, acc: 0.9811, rec: 0.9742, prec: 0.9699, iou: 0.8105, vloss: 0.1587, vacc: 0.9429, vrec: 0.9230, vprec: 0.8830, viou: 0.6790, lr: 0.0001 },
    { ep: 26, loss: 0.0856, acc: 0.9819, rec: 0.9750, prec: 0.9716, iou: 0.8136, vloss: 0.1555, vacc: 0.9452, vrec: 0.9184, vprec: 0.8932, viou: 0.6856, lr: 0.0001 },
    { ep: 27, loss: 0.0836, acc: 0.9827, rec: 0.9759, prec: 0.9729, iou: 0.8165, vloss: 0.1530, vacc: 0.9466, vrec: 0.9144, vprec: 0.9007, viou: 0.6916, lr: 0.0001 },
    { ep: 28, loss: 0.0816, acc: 0.9835, rec: 0.9770, prec: 0.9743, iou: 0.8194, vloss: 0.1515, vacc: 0.9477, vrec: 0.9095, vprec: 0.9081, viou: 0.6972, lr: 0.0001 },
    { ep: 29, loss: 0.0799, acc: 0.9841, rec: 0.9778, prec: 0.9753, iou: 0.8222, vloss: 0.1506, vacc: 0.9487, vrec: 0.9058, vprec: 0.9143, viou: 0.7013, lr: 0.0001 },
    { ep: 30, loss: 0.0787, acc: 0.9845, rec: 0.9785, prec: 0.9758, iou: 0.8244, vloss: 0.1519, vacc: 0.9485, vrec: 0.9050, vprec: 0.9143, viou: 0.7033, lr: 0.0001 },
    { ep: 31, loss: 0.0781, acc: 0.9844, rec: 0.9792, prec: 0.9747, iou: 0.8258, vloss: 0.1515, vacc: 0.9492, vrec: 0.8993, vprec: 0.9214, viou: 0.7068, lr: 0.0001 },
    { ep: 32, loss: 0.0775, acc: 0.9846, rec: 0.9787, prec: 0.9757, iou: 0.8273, vloss: 0.1490, vacc: 0.9502, vrec: 0.9060, vprec: 0.9189, viou: 0.7137, lr: 0.0001 },
    { ep: 33, loss: 0.0759, acc: 0.9851, rec: 0.9783, prec: 0.9777, iou: 0.8297, vloss: 0.1534, vacc: 0.9494, vrec: 0.8855, vprec: 0.9344, viou: 0.7133, lr: 0.0001 },
    { ep: 34, loss: 0.0751, acc: 0.9853, rec: 0.9812, prec: 0.9754, iou: 0.8311, vloss: 0.1466, vacc: 0.9513, vrec: 0.9070, vprec: 0.9217, viou: 0.7206, lr: 0.0001 },
    { ep: 35, loss: 0.0726, acc: 0.9865, rec: 0.9809, prec: 0.9791, iou: 0.8342, vloss: 0.1480, vacc: 0.9521, vrec: 0.8925, vprec: 0.9371, viou: 0.7247, lr: 0.0001 },
    { ep: 36, loss: 0.0720, acc: 0.9863, rec: 0.9818, prec: 0.9779, iou: 0.8361, vloss: 0.1522, vacc: 0.9498, vrec: 0.8948, vprec: 0.9272, viou: 0.7190, lr: 0.0001 },
    { ep: 37, loss: 0.0705, acc: 0.9871, rec: 0.9828, prec: 0.9791, iou: 0.8379, vloss: 0.1481, vacc: 0.9515, vrec: 0.8990, vprec: 0.9294, viou: 0.7249, lr: 0.0001 },
    { ep: 38, loss: 0.0705, acc: 0.9868, rec: 0.9824, prec: 0.9786, iou: 0.8395, vloss: 0.1542, vacc: 0.9494, vrec: 0.8869, vprec: 0.9330, viou: 0.7271, lr: 0.0001 },
    { ep: 39, loss: 0.0688, acc: 0.9875, rec: 0.9822, prec: 0.9809, iou: 0.8416, vloss: 0.1538, vacc: 0.9494, vrec: 0.8893, vprec: 0.9309, viou: 0.7280, lr: 1e-5 },
    { ep: 40, loss: 0.0676, acc: 0.9882, rec: 0.9845, prec: 0.9808, iou: 0.8428, vloss: 0.1536, vacc: 0.9495, vrec: 0.8920, vprec: 0.9286, viou: 0.7287, lr: 1e-5 },
    { ep: 41, loss: 0.0670, acc: 0.9886, rec: 0.9852, prec: 0.9811, iou: 0.8434, vloss: 0.1556, vacc: 0.9489, vrec: 0.8903, vprec: 0.9284, viou: 0.7288, lr: 1e-5 },
    { ep: 42, loss: 0.0666, acc: 0.9888, rec: 0.9848, prec: 0.9822, iou: 0.8440, vloss: 0.1577, vacc: 0.9484, vrec: 0.8878, vprec: 0.9289, viou: 0.7290, lr: 1e-5 },
    { ep: 43, loss: 0.0663, acc: 0.9890, rec: 0.9847, prec: 0.9826, iou: 0.8443, vloss: 0.1587, vacc: 0.9481, vrec: 0.8871, vprec: 0.9284, viou: 0.7298, lr: 1e-6 },
    { ep: 44, loss: 0.0663, acc: 0.9890, rec: 0.9847, prec: 0.9827, iou: 0.8443, vloss: 0.1597, vacc: 0.9477, vrec: 0.8865, vprec: 0.9278, viou: 0.7306, lr: 1e-6 }
  ];

  const SIZE = 128;
  const demoField = new Float32Array(SIZE * SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const dx1 = (x - 48) / 26;
      const dy1 = (y - 52) / 22;
      const p1 = Math.exp(-(dx1 * dx1 + dy1 * dy1) * 1.15);
      const dx2 = (x - 86) / 18;
      const dy2 = (y - 84) / 20;
      const p2 = Math.exp(-(dx2 * dx2 + dy2 * dy2) * 1.35);
      const dx3 = (x - 72) / 15;
      const dy3 = (y - 34) / 13;
      const p3 = 0.72 * Math.exp(-(dx3 * dx3 + dy3 * dy3) * 1.6);
      const tex = 0.08 * Math.sin(x * 0.22) * Math.cos(y * 0.19) + 0.05 * Math.sin((x + y) * 0.35);
      demoField[y * SIZE + x] = Math.max(0, Math.min(1, Math.max(p1, p2, p3) + tex));
    }
  }

  let activeField = demoField;
  let sourceKind = 'demo';
  let tileMode = 'mask';
  let thresh = 0.90;
  let activeMetric = 'iou';
  let activeEpoch = 44;

  const canvas = document.getElementById('tile-canvas');
  const ctx = canvas.getContext('2d');
  const canvasTag = document.getElementById('canvas-tag');
  const threshSlider = document.getElementById('thresh-slider');
  const threshVal = document.getElementById('thresh-val');
  const areaPct = document.getElementById('area-pct');
  const pngInput = document.getElementById('png-input');
  const loadPngBtn = document.getElementById('load-png-btn');
  const resetDemoBtn = document.getElementById('reset-demo-btn');
  const exportMaskBtn = document.getElementById('export-mask-btn');

  const curveSvg = document.getElementById('curve-svg');
  const epSlider = document.getElementById('ep-slider');
  const epLabel = document.getElementById('ep-label');
  const lrNote = document.getElementById('lr-note');
  const legA = document.getElementById('leg-a');
  const legB = document.getElementById('leg-b');
  const epReadout = document.getElementById('ep-readout');

  function hexToRgb(hex) {
    const h = hex.replace('#', '').trim();
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16)
    ];
  }

  function syncThreshPresets() {
    document.querySelectorAll('[data-thresh]').forEach((btn) => {
      const match = Math.abs(parseFloat(btn.dataset.thresh) - thresh) < 0.001;
      btn.setAttribute('aria-pressed', String(match));
    });
  }

  function renderTile() {
    const cs = getComputedStyle(document.documentElement);
    const bg = hexToRgb(cs.getPropertyValue('--bg'));
    const ndvi = hexToRgb(cs.getPropertyValue('--ndvi'));
    const nir = hexToRgb(cs.getPropertyValue('--nir'));
    const amber = hexToRgb(cs.getPropertyValue('--amber'));

    const img = ctx.createImageData(SIZE, SIZE);
    let positiveCount = 0;

    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const i = y * SIZE + x;
        const p = activeField[i];
        const isPositive = p >= thresh;
        if (isPositive) positiveCount++;

        let r;
        let g;
        let b;
        if (tileMode === 'prob') {
          if (p < 0.5) {
            const k = p * 2;
            r = ndvi[0] + (amber[0] - ndvi[0]) * k;
            g = ndvi[1] + (amber[1] - ndvi[1]) * k;
            b = ndvi[2] + (amber[2] - ndvi[2]) * k;
          } else {
            const k = (p - 0.5) * 2;
            r = amber[0] + (nir[0] - amber[0]) * k;
            g = amber[1] + (nir[1] - amber[1]) * k;
            b = amber[2] + (nir[2] - amber[2]) * k;
          }
        } else if (tileMode === 'edge') {
          const isEdge =
            isPositive &&
            (x === 0 ||
              x === SIZE - 1 ||
              y === 0 ||
              y === SIZE - 1 ||
              activeField[i - 1] < thresh ||
              activeField[i + 1] < thresh ||
              activeField[i - SIZE] < thresh ||
              activeField[i + SIZE] < thresh);
          if (isEdge) {
            r = nir[0];
            g = nir[1];
            b = nir[2];
          } else {
            const mix = isPositive ? 0.16 : 0.24;
            const c = isPositive ? nir : ndvi;
            r = bg[0] * (1 - mix) + c[0] * mix;
            g = bg[1] * (1 - mix) + c[1] * mix;
            b = bg[2] * (1 - mix) + c[2] * mix;
          }
        } else {
          const c = isPositive ? nir : ndvi;
          const mix = isPositive ? 0.85 : 0.34;
          r = bg[0] * (1 - mix) + c[0] * mix;
          g = bg[1] * (1 - mix) + c[1] * mix;
          b = bg[2] * (1 - mix) + c[2] * mix;
        }

        const o = i * 4;
        img.data[o] = r;
        img.data[o + 1] = g;
        img.data[o + 2] = b;
        img.data[o + 3] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);
    threshVal.textContent = thresh.toFixed(2);
    areaPct.textContent = ((positiveCount / (SIZE * SIZE)) * 100).toFixed(1) + '%';
    const prefix = sourceKind === 'local' ? 'LOCAL PNG' : 'DEMO FIELD';
    canvasTag.textContent =
      tileMode === 'prob' ? `${prefix} · PROBABILITY` : `${prefix} · p > ${thresh.toFixed(2)}`;
    syncThreshPresets();
  }

  function formatLr(lr) {
    if (lr === 0.001) return '1e-3';
    if (lr === 0.0001) return '1e-4';
    if (lr === 1e-5) return '1e-5';
    if (lr === 1e-6) return '1e-6';
    return String(lr);
  }

  function syncEpochPresets() {
    document.querySelectorAll('[data-ep]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(parseInt(btn.dataset.ep, 10) === activeEpoch));
    });
  }

  function renderCurve() {
    const cs = getComputedStyle(document.documentElement);
    const colA = cs.getPropertyValue('--ndvi').trim();
    const colB = cs.getPropertyValue('--sar').trim();
    const colLine = cs.getPropertyValue('--line').trim();
    const colMuted = cs.getPropertyValue('--muted').trim();
    const colInk = cs.getPropertyValue('--ink').trim();

    const W = 420;
    const H = 170;
    const padL = 32;
    const padR = 12;
    const padT = 12;
    const padB = 22;

    let keyA = 'iou';
    let keyB = 'viou';
    let minY = 0.15;
    let maxY = 1.02;
    let yTicks = [0.2, 0.6, 1.0];
    legA.textContent = 'Train';
    legB.textContent = 'Validation';

    if (activeMetric === 'loss') {
      keyA = 'loss';
      keyB = 'vloss';
      minY = 0.0;
      maxY = 0.72;
      yTicks = [0.0, 0.35, 0.7];
    } else if (activeMetric === 'acc') {
      keyA = 'acc';
      keyB = 'vacc';
      minY = 0.65;
      maxY = 1.02;
      yTicks = [0.7, 0.85, 1.0];
    } else if (activeMetric === 'pr') {
      keyA = 'vprec';
      keyB = 'vrec';
      minY = 0.40;
      maxY = 1.03;
      yTicks = [0.4, 0.7, 1.0];
      legA.textContent = 'Val Precision';
      legB.textContent = 'Val Recall';
    }

    const xOf = (ep) => padL + ((ep - 1) / (EPOCHS.length - 1)) * (W - padL - padR);
    const yOf = (v) => padT + (1 - (v - minY) / (maxY - minY)) * (H - padT - padB);

    const ptsA = EPOCHS.map((d) => `${xOf(d.ep).toFixed(1)},${yOf(d[keyA]).toFixed(1)}`).join(' ');
    const ptsB = EPOCHS.map((d) => `${xOf(d.ep).toFixed(1)},${yOf(d[keyB]).toFixed(1)}`).join(' ');

    const cur = EPOCHS[activeEpoch - 1];
    const cx = xOf(cur.ep);
    const cyA = yOf(cur[keyA]);
    const cyB = yOf(cur[keyB]);

    let grid = '';
    yTicks.forEach((v) => {
      const y = yOf(v).toFixed(1);
      grid += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${colLine}" stroke-width="1"/>`;
      grid += `<text x="${padL - 5}" y="${+y + 3}" text-anchor="end" fill="${colMuted}" font-family="monospace" font-size="9">${v.toFixed(1)}</text>`;
    });

    const lrShiftX = xOf(17).toFixed(1);
    grid += `<line x1="${lrShiftX}" y1="${padT}" x2="${lrShiftX}" y2="${H - padB}" stroke="${colLine}" stroke-dasharray="2 3" stroke-width="1"/>`;

    curveSvg.innerHTML = `
      ${grid}
      <line x1="${cx.toFixed(1)}" y1="${padT}" x2="${cx.toFixed(1)}" y2="${H - padB}" stroke="${colInk}" stroke-opacity="0.35" stroke-dasharray="3 2" stroke-width="1"/>
      <polyline fill="none" stroke="${colA}" stroke-width="2" points="${ptsA}"/>
      <polyline fill="none" stroke="${colB}" stroke-width="2" points="${ptsB}"/>
      <circle cx="${cx.toFixed(1)}" cy="${cyA.toFixed(1)}" r="3.5" fill="${colA}"/>
      <circle cx="${cx.toFixed(1)}" cy="${cyB.toFixed(1)}" r="3.5" fill="${colB}"/>
      <text x="${padL}" y="${H - 6}" fill="${colMuted}" font-family="monospace" font-size="9">Ep 1</text>
      <text x="${lrShiftX}" y="${H - 6}" text-anchor="middle" fill="${colMuted}" font-family="monospace" font-size="9">Ep 17</text>
      <text x="${xOf(34).toFixed(1)}" y="${H - 6}" text-anchor="middle" fill="${colMuted}" font-family="monospace" font-size="9">Ep 34</text>
      <text x="${W - padR}" y="${H - 6}" text-anchor="end" fill="${colMuted}" font-family="monospace" font-size="9">Ep 44</text>
    `;

    epLabel.textContent = `Epoch ${cur.ep} / 44`;
    const lrTag = cur.ep === 44 ? ' (EarlyStop)' : cur.ep === 17 ? ' (LR drop)' : '';
    lrNote.textContent = `LR: ${formatLr(cur.lr)}${lrTag}`;

    const fmt = (v) => (activeMetric === 'acc' ? (v * 100).toFixed(1) + '%' : v.toFixed(3));
    const labelA = activeMetric === 'pr' ? 'Val Prec' : 'Train';
    const labelB = activeMetric === 'pr' ? 'Val Rec' : 'Val';
    epReadout.innerHTML =
      `<span>${labelA}: <strong>${fmt(cur[keyA])}</strong></span>` +
      `<span>${labelB}: <strong>${fmt(cur[keyB])}</strong></span>` +
      `<span>Val P / R: <strong>${cur.vprec.toFixed(2)} / ${cur.vrec.toFixed(2)}</strong></span>` +
      `<span>Test (42 chips): <strong>0.460 IoU · 99.1% rec</strong></span>`;

    syncEpochPresets();
  }

  function scrubCurveFromPointer(ev) {
    const rect = curveSvg.getBoundingClientRect();
    if (!rect.width) return;
    const padL = (32 / 420) * rect.width;
    const padR = (12 / 420) * rect.width;
    const span = rect.width - padL - padR;
    const rel = Math.max(0, Math.min(1, (ev.clientX - rect.left - padL) / span));
    activeEpoch = Math.max(1, Math.min(44, Math.round(rel * 43) + 1));
    epSlider.value = String(activeEpoch);
    renderCurve();
  }

  let dragging = false;
  curveSvg.addEventListener('pointerdown', (ev) => {
    dragging = true;
    curveSvg.setPointerCapture(ev.pointerId);
    scrubCurveFromPointer(ev);
  });
  curveSvg.addEventListener('pointermove', (ev) => {
    if (dragging) scrubCurveFromPointer(ev);
  });
  curveSvg.addEventListener('pointerup', () => {
    dragging = false;
  });
  curveSvg.addEventListener('pointercancel', () => {
    dragging = false;
  });

  threshSlider.addEventListener('input', () => {
    thresh = parseFloat(threshSlider.value);
    renderTile();
  });

  document.querySelectorAll('[data-thresh]').forEach((btn) => {
    btn.addEventListener('click', () => {
      thresh = parseFloat(btn.dataset.thresh);
      threshSlider.value = thresh.toFixed(2);
      renderTile();
    });
  });

  document.querySelectorAll('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      tileMode = btn.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach((b) => {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      renderTile();
    });
  });

  epSlider.addEventListener('input', () => {
    activeEpoch = parseInt(epSlider.value, 10);
    renderCurve();
  });

  document.querySelectorAll('[data-ep]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeEpoch = parseInt(btn.dataset.ep, 10);
      epSlider.value = String(activeEpoch);
      renderCurve();
    });
  });

  document.querySelectorAll('[data-metric]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeMetric = btn.dataset.metric;
      document.querySelectorAll('[data-metric]').forEach((b) => {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      renderCurve();
    });
  });

  loadPngBtn.addEventListener('click', () => pngInput.click());

  pngInput.addEventListener('change', () => {
    const file = pngInput.files && pngInput.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const off = document.createElement('canvas');
      off.width = SIZE;
      off.height = SIZE;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, SIZE, SIZE);
      const px = octx.getImageData(0, 0, SIZE, SIZE).data;
      const loaded = new Float32Array(SIZE * SIZE);
      for (let i = 0; i < SIZE * SIZE; i++) {
        const o = i * 4;
        const lum = (0.299 * px[o] + 0.587 * px[o + 1] + 0.114 * px[o + 2]) / 255;
        loaded[i] = lum;
      }
      URL.revokeObjectURL(url);
      activeField = loaded;
      sourceKind = 'local';
      resetDemoBtn.hidden = false;
      renderTile();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
    };
    img.src = url;
    pngInput.value = '';
  });

  resetDemoBtn.addEventListener('click', () => {
    activeField = demoField;
    sourceKind = 'demo';
    resetDemoBtn.hidden = true;
    renderTile();
  });

  exportMaskBtn.addEventListener('click', () => {
    const out = document.createElement('canvas');
    out.width = SIZE;
    out.height = SIZE;
    const octx = out.getContext('2d');
    const img = octx.createImageData(SIZE, SIZE);
    for (let i = 0; i < SIZE * SIZE; i++) {
      const v = activeField[i] >= thresh ? 255 : 0;
      const o = i * 4;
      img.data[o] = v;
      img.data[o + 1] = v;
      img.data[o + 2] = v;
      img.data[o + 3] = 255;
    }
    octx.putImageData(img, 0, 0);
    const trigger = (href) => {
      const a = document.createElement('a');
      a.href = href;
      a.download = `deforestation-mask-p${thresh.toFixed(2)}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    if (out.toBlob) {
      out.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        trigger(url);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } else {
      trigger(out.toDataURL('image/png'));
    }
  });

  window.addEventListener('dmxsan:themechange', () => {
    renderTile();
    renderCurve();
  });

  renderTile();
  renderCurve();
})();
