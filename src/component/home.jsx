import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Login from './login';
import Todos from './todos';
import Posts from './posts';
export default function Home({name,userId}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/Home" element={<h1>Home</h1>} />
          <Route path="/Todos" element={<Todos userId={userId}/>} />
          <Route path="/Albums" element={<h1>Albums</h1>} />
          <Route path="/Posts" element={<Posts />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
      <footer>
        <div>Welcome {name} </div>
        <button type="button">button</button>
      </footer>
    </BrowserRouter>
  )
}

