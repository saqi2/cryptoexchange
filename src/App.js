import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import Signup from './components/signup/signup';

function App() {
  const [users, setUsers] = useState([]);
  const addUser = (user) => {
    setUsers([...users, user]);
  }
  const removeUser = (user) => {
    const newUsers = users.filter(u => u.name !== user.name);
    setUsers(newUsers);
  }
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login users={users} removeUser={removeUser}/> }/>
          <Route path="/signup" element={<Signup users={users} addUser={addUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
