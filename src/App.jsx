import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleLogin = () => {
    if (username.trim() !== '') setIsLoggedIn(true);
  };

  const addTask = () => {
    if (input.trim() === '' || deadline.trim() === '') return;
    const newTask = { text: input, deadline, day: selectedDay };
    setTasks([...tasks, newTask]);
    setInput('');
    setDeadline('');
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const planets = [
    { name: 'बुध', color: 'gray' },
    { name: 'शुक्र', color: 'goldenrod' },
    { name: 'पृथ्वी', color: 'deepskyblue' },
    { name: 'मंगल', color: 'orangered' },
    { name: 'गुरु', color: 'khaki' },
    { name: 'शनि', color: 'slategray' },
    { name: 'यूरेनस', color: 'lightblue' },
    { name: 'नेपच्यून', color: 'darkblue' },
    { name: 'प्लूटो', color: 'saddlebrown' },
  ];

  return (
    <div className="app">
      <div className="solar-system">
        {planets.map((planet, index) => (
          <div
            key={index}
            className="orbit"
            style={{
              width: `${100 + index * 40}px`,
              height: `${100 + index * 40}px`,
              marginTop: `-${50 + index * 20}px`,
              marginLeft: `-${50 + index * 20}px`,
              animationDuration: `${20 + index * 5}s`,
            }}
          >
            <div className="planet" style={{ background: planet.color }}>
              <span>{planet.name}</span>
            </div>
          </div>
        ))}
      </div>

      {!isLoggedIn ? (
        <div className="login-box">
          <h2> Welcome to To-Do List</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <h1>Hi {username} 🌞 - Your Weekly Tasks</h1>

          <div className="week-selector">
            {weekDays.map((day) => (
              <button
                key={day}
                className={selectedDay === day ? 'selected' : ''}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="input-section">
            <input
              type="text"
              placeholder="Task description"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          <ul className="task-list">
            {tasks
              .filter((task) => task.day === selectedDay)
              .map((task, index) => (
                <li key={index} className="task-item">
                  <div>
                    <strong>{task.text}</strong>
                    <p>⏰ Due: {new Date(task.deadline).toLocaleString()}</p>
                  </div>
                  <button onClick={() => deleteTask(index)}>❌</button>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
