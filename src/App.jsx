import './App.css';
import Login from './component/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Home from './component/home';
function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(-1);
  const [completed, setCompleted] = useState();

  return (
    <div className="App">
      <Login  name={name} setName={setName} password={password} setPassword={setPassword}  userId={userId} setUserId={setUserId}/>
      <Home name={name} userId={userId} />
    </div>
  );
}

export default App;
