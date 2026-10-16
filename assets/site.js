(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-button');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('homepage-theme'); } catch {}
  let explicitTheme = savedTheme === 'dark' || savedTheme === 'light';

  function applyTheme(dark) {
    root.dataset.theme = dark ? 'dark' : 'light';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#131c18' : '#f7f8f2';
  }

  applyTheme(explicitTheme ? savedTheme === 'dark' : preference.matches);
  button.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    explicitTheme = true;
    applyTheme(dark);
    try { localStorage.setItem('homepage-theme', dark ? 'dark' : 'light'); } catch {}
  });
  preference.addEventListener('change', event => {
    if (!explicitTheme) applyTheme(event.matches);
  });
  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
})();
