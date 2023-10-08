import  ReactDOM  from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import {createRoot} from 'react-dom/client'
import { fetchPlugin } from "./plugins/fetch-plugin";
const App = () =>{
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();
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
    setCode(result.outputFiles[0].text);
    try{
      eval(result.outputFiles[0].text);
    }catch (err){
      alert(err)
    }
    
  };

  useEffect(()=>{
    startService();
  },[]);

  return <div>
    <textarea value={input} onChange={e=>setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>;
};
const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <App/>
)