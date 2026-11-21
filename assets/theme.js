(() => {
  const THEME_STORAGE_KEY = 'dmxsan-theme';

  function readStoredTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function getActiveTheme() {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function syncToggleButtons(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const lightLabel = btn.dataset.lightLabel || 'Light EO';
      const darkLabel = btn.dataset.darkLabel || 'Dark Forest';
      const targetLabel = isDark ? lightLabel : darkLabel;
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', `${darkLabel} palette`);
      btn.setAttribute('title', `Switch palette to ${targetLabel}`);
    });
  }

  function applyTheme(theme, persist) {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      if (bg) meta.setAttribute('content', bg);
    }

    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {}
    }

    syncToggleButtons(theme);
    window.dispatchEvent(new CustomEvent('dmxsan:themechange', { detail: { theme } }));
  }

  document.addEventListener('click', (ev) => {
    const btn = ev.target && ev.target.closest ? ev.target.closest('[data-theme-toggle]') : null;
    if (!btn) return;
    const next = getActiveTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });

  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', (ev) => {
      if (readStoredTheme() !== null) return;
      applyTheme(ev.matches ? 'dark' : 'light', false);
    });
  }

  window.addEventListener('storage', (ev) => {
    if (ev.key === THEME_STORAGE_KEY) {
      applyTheme(readStoredTheme() || getSystemTheme(), false);
    }
  });

  applyTheme(readStoredTheme() || getSystemTheme(), false);
})();
