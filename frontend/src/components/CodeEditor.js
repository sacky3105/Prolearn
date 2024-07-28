import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { MonacoLanguageClient, CloseAction, ErrorAction, MonacoServices } from 'monaco-languageclient';
import { listen } from 'vscode-ws-jsonrpc';
import { createUrl } from '../utils';
import './CodeEditor.css'; // スタイルシートをインポート

const CodeEditor = () => {
  const [language, setLanguage] = useState('rust');
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    MonacoServices.install(monaco);

    const url = createUrl('ws://localhost:8080/lsp/start');
    const webSocket = new WebSocket(url);

    listen({
      webSocket,
      onConnection: (connection) => {
        const languageClient = createLanguageClient(connection);
        const disposable = languageClient.start();
        connection.onClose(() => disposable.dispose());
      }
    });

    function createLanguageClient(connection) {
      return new MonacoLanguageClient({
        name: "Sample Language Client",
        clientOptions: {
          documentSelector: [{ language }],
          errorHandler: {
            error: () => ErrorAction.Continue,
            closed: () => CloseAction.DoNotRestart
          }
        },
        connectionProvider: {
          get: (errorHandler, closeHandler) => {
            return Promise.resolve({
              listen: (callback) => {
                connection.onClose(closeHandler);
                connection.onError(errorHandler);
                connection.listen(callback);
              },
              dispose: () => connection.dispose()
            });
          }
        }
      });
    }
  };

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="rust">Rust</option>
      </select>
      <Editor
        height="500px"
        width="100%"
        language={language}
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
