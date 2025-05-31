// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './pages/UserForm';

import './App.css';
import RegisteredUsers from './pages/RegisteredUser';

function App() {
  return (
    <Router>
      <div className="App max-w-4xl mx-auto p-6">
        <nav className="mb-6 flex gap-4">
          <Link className="text-blue-600 hover:underline" to="/">Register User</Link>
          <Link className="text-blue-600 hover:underline" to="/user">Registered Users</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/user" element={<RegisteredUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
