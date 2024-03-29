import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import './code-editor.css';
import Highlighter from 'monaco-jsx-highlighter';
import codeShift from 'jscodeshift';
import './syntax.css';
interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      ()=>{},
      ()=>{},
      undefined,
      ()=>{}
    );
  };
  const onFormatClick = () =>{
    //get current value from editor
    const unFormatted = editorRef.current.getModel().getValue();

    //format that value
    const formatted = prettier.format(unFormatted,{
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/,'');
    editorRef.current.setValue(formatted);

  };

  return (
  <div className='editor-wrapper'>
    <button className='button button-format is-primary is-small' onClick={onFormatClick}>Format</button>
    <MonacoEditor

    editorDidMount={onEditorDidMount}
    value={initialValue}
    theme='dark'
    language='javascript'
    height='100%'
    options={{
      wordWrap: 'on',
      minimap: { enabled: false },
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,
    }}
  />
  </div>
  )
};
export default CodeEditor;