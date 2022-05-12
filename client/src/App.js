import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://localhost:3000/users')
    .then(res => {
      console.log(res.data);
    })
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
    </div>
  );
}

export default App;
