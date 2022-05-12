import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/users')
    .then(res => {
      console.log(res.data);
      setData(res.data)
    })
    .catch(err => { 
      console.log(err) 
    })
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
    </div>
  );
}

export default App;
