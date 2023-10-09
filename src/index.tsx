import  ReactDOM  from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import {createRoot} from 'react-dom/client'
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";
import 'bulmaswatch/superhero/bulmaswatch.min.css';
const App = () =>{
  const [input, setInput] = useState('');
  
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const startService = async () =>{
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
    
  };
  const onClick = async () =>{
    if(!ref.current){
      return;
    }
    iframe.current.srcdoc = html;
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    // console.log(result);
    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    
  };

  useEffect(()=>{
    startService();
  },[]);

  const html = `
  <html>
    <head></head>
    <div id="root"></div>
    <script>
      window.addEventListener('message',(event)=>{
        try{
          eval(event.data);
        }catch (err){
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
          console.log(err);
        }
        
      },false)
    </script>
  </html>
`;

  return <div>
    <CodeEditor onChange={(value)=>setInput(value)} initialValue={input}/>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>

    <iframe title="preview" sandbox="allow-scripts" ref={iframe} srcDoc={html}></iframe>
  </div>;
};

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <App/>
)