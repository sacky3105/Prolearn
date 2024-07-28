import React, { useState, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { MonacoLanguageClient, CloseAction, ErrorAction, MonacoServices } from 'monaco-languageclient';
import { listen } from 'vscode-ws-jsonrpc';
import { createUrl } from '../utils';
import './CodeEditor.css'; // スタイルシートをインポート

const CodeEditor = () => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [language, setLanguage] = useState('rust');

  useEffect(() => {
    if (containerRef.current) {
      const editor = monaco.editor.create(containerRef.current, {
        value: '',
        language: 'rust',
        theme: 'vs-dark',
      });
      editorRef.current = editor;
      MonacoServices.install(editor);

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
            documentSelector: ['rust'],
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
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="rust">Rust</option>
      </select>
      <div ref={containerRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default CodeEditor;
