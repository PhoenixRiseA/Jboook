import { createRoot } from 'react-dom/client'
import CodeCell from "./components/code-cell";
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TextEditor from './components/text-editor';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';

const App = () => {
  return<Provider store={store}>
     <div>
    {/* <CodeCell /> */}
    {/* <TextEditor/> */}
    <CellList/>
  </div>
  </Provider>;
};

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <App />
)