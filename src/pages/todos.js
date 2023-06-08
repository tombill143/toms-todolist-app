import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://srnfkyrojafodjdnuqxt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybmZreXJvamFmb2RqZG51cXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzODMsImV4cCI6MTk5NTQ5NTM4M30.8dg-zDW-_No-5jaFD6CQ3UCai_8KSKWy5ImQGL2Rz_s";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todolist")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setTodos(data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        todo: newTodo,
      };

      try {
        await supabase.from("todolist").insert([newTodoItem]);

        setTodos((prevTodos) => [...prevTodos, newTodoItem]); // Add the new job directly to the state
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const removeTodo = async (id) => {
    try {
      await supabase.from("todolist").delete().match({ id });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove the job from the state
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-12 mb-4">
        Jobs to do over the next few months
      </h1>
      <div className="max-w-md mx-auto my-16 p-6 bg-white rounded">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            className="flex-grow mr-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded transition duration-200 transform hover:scale-110"
          >
            Add Job To List
          </button>
        </div>

        <ul className="list-disc pl-6">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center mb-2">
              <span className="flex-grow">{todo.todo}</span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-white bg-red-500 ml-2 pb-1 rounded-full w-10 h-10 flex items-center justify-center transition duration-200 transform hover:scale-110"
                style={{
                  borderRadius: "10%",
                  background: "linear-gradient(to top right, red, orange)",
                }}
              >
                <span className="text-xl font-bold">
                  <span
                    className="p-2"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    x
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
