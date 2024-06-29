import logo from './logo.svg';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

/* const arrayTodos = [
  { name: "Limpar a casa", status: true},
  { name: "Limpar o cachorro", status: false},
]; */


function App() {

  const Todos = ({ todos }) => {
    return (
      <div className="todos"> 
          {todos.map((todo) => {
          return (
            <div className="todo" key={todo.name}>
              <button
                onClick={() => modifyStatusTodo(todo)} 
                className='checkbox'
                style={{backgroundColor: todo.status ? '#a879e6' : 'white'}}
              ></button>
              <p>{todo.name}</p>
              <button
                onClick={() => handleWithEditButtonClick(todo)}
              >
                <AiOutlineEdit 
                  color={"#64697b"}
                  size={20}
                />
              </button>
              <button onClick={() => {deleteTodo(todo)}}>
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

  
  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  };

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputValue(todo.name);
    //setInputVisibility(true);
    setInputVisibility(!inputVisibility);
  };

  async function getTodos() {
    const response = await axios.get('http://localhost:3333/todos');
    setTodos(response.data);
    //console.log(response.data);
  };

  async function editTodo() {
    await axios.put('http://localhost:3333/todos', {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisibility(false);
    getTodos();
    setInputValue("");
  }

  async function createTodo() {
    const response = await axios.post('http://localhost:3333/todos', {
      name: inputValue,
    });
    //getTodos();
    //setinputVisibility(!inputVisibility);
    setTodos([...todos, response.data]);
    setInputValue("");
    setInputVisibility(false);
  };

  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    //setTodos(todos.filter((t) => t.id!== todo.id));
    getTodos();
  };

  async function modifyStatusTodo(todo) {
    await axios.put("http://localhost:3333/todos/", {
      id: todo.id,
      status:!todo.status,
    });
    getTodos();
    //setTodos(todos.map((t) => t.id === todo.id? {...t, status:!t.status} : t));
  };

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

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
        <input 
          value={inputValue} 
          style={{display: inputVisibility ? "block" : "none"}}
          onChange={(event) => {
             setInputValue(event.target.value);
          }}
          className='inputName'>
        </input>
        <button onClick={inputVisibility ? selectedTodo ? editTodo : createTodo : handleWithNewButton} className='newTaskButton'>
          {inputVisibility ? "Confirm" : "+ New task"}</button>
      </header>
    </div>
  );
}

export default App;
