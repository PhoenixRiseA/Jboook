import { createRoot } from 'react-dom/client'
import CodeCell from "./components/code-cell";
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return <div>
    <CodeCell />
  </div>;
};

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <App />
)