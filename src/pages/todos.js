import { useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-12 mb-4">
        Jobs to do over the next few months
      </h1>
      <div className="max-w-md mx-auto my-16 p-6 bg-white rounded">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-2">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            className="flex-grow mr-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Job To List
          </button>
        </div>
        <ul className="list-disc pl-6">
          {todos.map((todo, index) => (
            <li key={index} className="mb-2">
              {todo}
              <button
                onClick={() => removeTodo(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
