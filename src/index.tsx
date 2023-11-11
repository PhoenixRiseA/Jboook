import { createRoot } from 'react-dom/client'
import CodeCell from "./components/code-cell";
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import TextEditor from './components/text-editor';

const App = () => {
  return <div>
    {/* <CodeCell /> */}
    <TextEditor/>
  </div>;
};

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <App />
)