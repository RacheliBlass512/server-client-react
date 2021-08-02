import React, { useState } from 'react'
import { Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Menu from '../Menu/Menu'
import BooksList from '../BooksList/BooksList'
import './RouteComponent.css'
import Cart from '../Cart/Cart';
import Home from '../Home/Home';


export default function RouteComponent({ userDetails, updateUserDetails }) {
  const [loading, setloading] = useState(false)
  return (
    <BrowserRouter>
      <div className="container-r head-r">
        <p>Books for you</p>
      </div>
      <Menu userDetails={userDetails} updateUserDetails={updateUserDetails} />
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/AdultBooks">
            <BooksList type="AdultBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} setloading={setloading} loading = {loading}/>
          </Route>
          <Route path="/ChildrenBooks">
            <BooksList type="ChildrenBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} setloading={setloading} loading = {loading}/>
          </Route>
          <Route path="/ComicsBooks">
            <BooksList type="ComicsBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} setloading={setloading} loading = {loading}/>
          </Route>
          <Route path="/CookingBooks" >
            <BooksList type="CookingBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} setloading={setloading} loading = {loading}/>
          </Route>
          <Route path="/Moosar">
            <BooksList type="Moosar" userDetails={userDetails} updateUserDetails={updateUserDetails} setloading={setloading} loading = {loading}/>
          </Route>
          <Route path="/Tora">
            <BooksList type="Tora" userDetails={userDetails} updateUserDetails={updateUserDetails} setloading={setloading} loading = {loading}/>
          </Route>
          <Route path="/Cart">
            <Cart userDetails={{ ...userDetails }} updateUserDetails={updateUserDetails} setloading={setloading} loading = {loading}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}