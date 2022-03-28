import './App.css';
import Todolist from './component/Todolist';
import Header from './component/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import routes from './routes/routes';


function App() {
  return (
    <>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        {routes.map((route, index)=>(<Route key={index} path={route.path} element={<route.component/>}></Route>))}
      </Routes>
    </BrowserRouter>
        
    </>
  );
}

export default App;
