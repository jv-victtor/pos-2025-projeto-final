import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ResourceManager from './ResourceManager';
import './App.css';

function App() {
  const resources = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];

  return (
    <Router>
      <div className="container">
        <h1>Facebook</h1>
        <nav>
          {resources.map(res => (
            <Link key={res} to={`/${res}`}>{res.toUpperCase()}</Link>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          {resources.map(res => (
            <Route 
              key={res} 
              path={`/${res}`} 
              element={<ResourceManager resource={res} />} 
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;