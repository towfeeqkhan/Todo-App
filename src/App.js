import "./styles.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTodos(newTodo) {
    setTodos((prevtodos) => [...prevtodos, newTodo]);
  }

  function handleToggle(id) {
    setTodos((prevtodos) =>
      prevtodos.map((todoitem) =>
        todoitem.id === id
          ? { ...todoitem, isCompleted: !todoitem.isCompleted }
          : todoitem
      )
    );
  }

  function handleTodoDelete(id) {
    setTodos((prevtodos) => prevtodos.filter((todoitem) => todoitem.id !== id));
  }

  return (
    <div className="App">
      <Heading />
      <AddTodo onAddTodos={handleAddTodos} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onTodoDelete={handleTodoDelete}
      />
    </div>
  );
}

function Heading() {
  return <h1 className="heading">Todo App</h1>;
}

function AddTodo({ onAddTodos }) {
  const [inputData, setInputData] = useState({
    task: "",
  });

  function handleChange(e) {
    const { value } = e.target;
    setInputData((prev) => ({ ...prev, task: value }));
  }

  function handleAddNewTodo() {
    if (!inputData.task) {
      alert("Task Field is empty");
      return;
    }

    const newTodo = {
      id: Date.now(),
      task: inputData.task,
      isCompleted: false,
    };

    onAddTodos(newTodo);

    setInputData({
      task: "",
    });
  }

  return (
    <div className="addtodo-div">
      <input
        className="todo-input"
        type="text"
        name="task"
        value={inputData.task}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleAddNewTodo()}
      />
      <button
        disabled={!inputData.task.trim()}
        className="addtodo-btn"
        onClick={handleAddNewTodo}
      >
        Add
      </button>
    </div>
  );
}

function TodoList({ todos, onToggle, onTodoDelete }) {
  return (
    <div className="todolist-div">
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          onToggle={onToggle}
          onTodoDelete={onTodoDelete}
        />
      ))}
    </div>
  );
}

function Todo({ todo, onToggle, onTodoDelete }) {
  return (
    <div className="todo-div">
      <div className="todo-group">
        <input
          className="checkbox"
          type="checkbox"
          value={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
        />
        <p className={`todo-txt ${todo.isCompleted ? "todo-checked" : ""}`}>
          {todo.task}
        </p>
      </div>
      <button className="delete-btn" onClick={() => onTodoDelete(todo.id)}>
        <MdDelete size={25} color="#e63946" />
      </button>
    </div>
  );
}
