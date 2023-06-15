import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./App.css";

function App() {
  const BackendURL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5051";

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchAllTodos = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api`);
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await axios.post(`${BackendURL}/api/update`, {
          _id: editId,
          text: todo,
        });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTodo("");
        setEditId(null);
      } else if (todo !== "") {
        const response = await axios.post(`${BackendURL}/api/create`, {
          text: todo,
        });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTodo("");
      }
      fetchAllTodos();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`${BackendURL}/api/delete`, {
        _id: id,
      });
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchAllTodos();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };
  const handleEdit = async (id) => {
    const editTodo = todos.find((i) => i._id === id);
    setTodo(editTodo.text);
    setEditId(id);
  };
  // console.log(todos, "todos");

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "Add"} </button>
        </form>

        <ul className="allTodos">
          {todos.length > 0 ? (
            todos.map((td) => (
              <li className="singleTodo" key={td._id}>
                <span className="todoText">{td.text}</span>
                <button onClick={() => handleEdit(td._id)}>Edit</button>
                <button onClick={() => handleDelete(td._id)}>Delete</button>
              </li>
            ))
          ) : (
            <h5>Please Add todos ......</h5>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
