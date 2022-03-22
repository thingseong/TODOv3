import logo from './logo.svg';
import './App.css';
import Todolist from './component/Todolist';
import {DragDropContext} from 'react-beautiful-dnd';



function App() {
  return (
    <div className="App">

        <Todolist></Todolist>

    </div>
  );
}

export default App;
