import logo from './logo.svg';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

/* const arrayTodos = [
  { name: "Limpar a casa", status: true},
  { name: "Limpar o cachorro", status: false},
]; */

const Todos = ({ todos }) => {
  return (
    <div className="todos"> 
        {todos.map((todo) => {
        return (
          <div className="todo" key={todo.name}>
            <button 
              className='checkbox'
              style={{backgroundColor: todo.status ? '#a879e6' : 'white'}}
            ></button>
            <p>{todo.name}</p>
            <button>
              <AiOutlineEdit 
                color={"#64697b"}
                size={20}
              />
            </button>
            <button>
              <AiOutlineDelete 
                color={"#64697b"}
                size={20}
              />
            </button>
          </div>
        )})}
    </div>
  );
};

function App() {

  async function getTodos() {
    const response = await axios.get('http://localhost:3333/todos');
    setTodos(response.data);
    //console.log(response.data);
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className='header'>
          <h1>Dont be lazzy</h1>
        </div>
        {/* <Todos todos={arrayTodos}/> */}
        <Todos todos={todos}/>
        <input className='inputName'></input>
        <button className='newTaskButton'>+ New task</button>
      </header>
    </div>
  );
}

export default App;
