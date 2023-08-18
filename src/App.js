import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './components/Home'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { AddProducts } from './components/AddProducts'
import { Cart } from './components/Cart'


export const App = () => {
  return (
    <BrowserRouter>
     <Routes>
       <Route exact path ="/" Component={Home}/>
       <Route path="/signup" Component={Signup}/>
       <Route path="/login" Component={Login}/>
       <Route path="/add-products" Component={AddProducts}/>
      <Route path='/cart' Component={Cart}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
