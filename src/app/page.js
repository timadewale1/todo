'use client';
import { useState } from 'react';

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
  border: '1px solid #ccc',
  margin: '4px 0',
};

const headingStyle = {
  textAlign: 'center',
  color: 'aqua',
};

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const timestamp = new Date().toLocaleString();
      setTodos([...todos, { text: newTodo, timestamp, completed: false }]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    const completedTodo = updatedTodos.splice(index, 1)[0];
    completedTodo.completed = true;
    completedTodo.completedTimestamp = new Date().toLocaleString();
    setCompletedTodos([...completedTodos, completedTodo]);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1 style={headingStyle}>TODO APP MADE BY TIMMY</h1>
      <div style={{ display: 'flex', marginBottom: '8px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ flex: '1', marginRight: '8px', padding: '4px' }}
        />
        <button onClick={addTodo} style={{ padding: '4px 8px' }}>
          Add Todo
        </button>
      </div>
      <h2>Tasks</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {todos.map((todo, index) => (
          <li key={index} style={listItemStyle}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              {todo.text}
            </label>
            <button onClick={() => removeTodo(index)}>Remove</button>
            <span>Uploaded: {todo.timestamp}</span>
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {completedTodos.map((todo, index) => (
          <li key={index} style={listItemStyle}>
            <label>
              <input type="checkbox" checked={true} readOnly />
              {todo.text}
            </label>
            <span>Uploaded: {todo.timestamp}</span>
            <span>Completed: {todo.completedTimestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
