import  ReactDOM  from "react-dom";
import { useState, useEffect, useRef } from "react";
import {createRoot} from 'react-dom/client'

import CodeEditor from "./components/code-editor";
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from "./components/preview";
import bundle from './bundler'
const App = () =>{
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  const onClick = async () =>{
    const output = await bundle(input);
    setCode(output);
    
    
  };
 

  return <div>
    <CodeEditor onChange={(value)=>setInput(value)} initialValue={input}/>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
      <Preview code={code}  />

  </div>;
};

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <App/>
)