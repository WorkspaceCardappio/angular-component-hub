
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 54752, hash: '1e73c840980ed961b75b2f026d551de0c8df569b46b4ae303bd7f99e6f0681ec', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1016, hash: '08695289df0c5349a600cc0ac591b7d53b5126a9dbc0822214c9305a0c72fcf5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 55884, hash: '2c5d368bb526dbc78de1cd19b8b58b2dc8526a3ceedd80726515cf33a7aa803d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NSIX36IH.css': {size: 177632, hash: 'HDUZCsKfcX4', text: () => import('./assets-chunks/styles-NSIX36IH_css.mjs').then(m => m.default)}
  },
};
