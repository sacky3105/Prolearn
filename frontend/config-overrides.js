const { override, addBabelPlugins, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPlugins(
    '@babel/plugin-transform-private-property-in-object'
  ),
  addWebpackAlias({
    'monaco-languageclient': path.resolve(__dirname, 'node_modules/monaco-languageclient/lib/index.js'),
    'vscode-ws-jsonrpc': path.resolve(__dirname, 'node_modules/vscode-ws-jsonrpc/lib/index.js')
  })
);
