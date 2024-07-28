module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(monaco-languageclient|vscode-ws-jsonrpc|monaco-editor)/)',
    ],
    testEnvironment: 'jsdom',
  };  