import logo from './bel_logo.jpg';
import './App.css';
import Compo from './Components/component.js'
import { ModifyComponent } from './Components/modifyComponent';
import Add  from './Components/add';
import { Component } from 'react';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
function App() {
  return (
    <Provider store={store}>

    <div className="App">

      <header className="App-header-head">
      <h1 className='App-header '>Material <span style={{color:'#008000'}}>Gate</span> 
      Pass
      
      </h1>
      </header>
      <div className="App-body">

        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Compo/>}></Route>
        <Route path="modify/:id" element={<ModifyComponent />} />
        <Route path="add" element={<Add />} />

        </Routes>
        </BrowserRouter>

      </div>
    </div>
    </Provider>

  );
}

export default App;
