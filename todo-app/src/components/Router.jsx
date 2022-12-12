import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';
import Todo from './Todo';
import TodoItem from './TodoItem';

function Router() {
  return (
    <>
        <div>
            <Navbar/>
        </div>
       <Routes>
       <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/todoitem" element={<TodoItem/>}/>
      </Routes>
    </>
  )
}

export default Router
