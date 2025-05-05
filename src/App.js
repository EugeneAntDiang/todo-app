import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import ToDoItem from "./components/ToDoItem";


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // use effect is the first thing that the app will do when open 
  // it is fetching the todos from the backend and setting it into a variable setTodos for it to be used
  useEffect(() => {
    fetch("https://localhost:8080/todos")
      .then(Response => Response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      });

  }, []);

  async function handleAddTodo() {
    // make sure that it is not empty 
    if (!newTodo.trim()) return;

    try {
      // error handling ang it is gaining access to the POST function in the backend 
      const response = await axios.post("http://localhost:8080/todos", {
        title: newTodo,
        done: false

      });

      // add the new todo to the current list of todos
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo(""); // clears the input field after adding 
    } catch (error) {
      console.error("failed to add todo", error)
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // make a DELETE request to your backend to delete the to-do from the database
      await axios.delete(`http://localhost:8080/todos/${id}`);


      //update the state by filtering out the deleted todo

      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete the to-do", error)
    }

  };

  function handleToggleComplete(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }; // toggle completed true/false
      }
      return todo;
    });
    setTodos(updatedTodos);
  }



  return (
    <div className="container">
      <h1>To-do App</h1>

      {/*Input for adding new todo */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new to-do"
        />
        <button className="add" onClick={handleAddTodo}>
          Add Todo
        </button>

      </div>

      {/*rendering the list of todos */}

      <div className="Todo-list">
        {todos.map(todo => (
          <ToDoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} onToggle={handleToggleComplete} />
        ))}
      </div>
    </div>


  );

}


export default App;