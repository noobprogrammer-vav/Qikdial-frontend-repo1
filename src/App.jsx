import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'


import Homepage from './components/Homepage'
import Listing_detail from './components/Listing_detail';
import All_listings from './components/All_listings';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Contactus from './components/Contactus';
import About from './components/About';

function App() {

  // useEffect(() => {
  //   let nav_list = ['/', '/listing', '/listings']
  // })

  return (
    <>
    <ToastContainer />
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Homepage} />
      <Route path='/listing' Component={Listing_detail} />
      <Route path='/listings' Component={All_listings} />
      <Route path='/favourites' Component={Favorites} />
      <Route path='/login' Component={Login} />
      <Route path='/contact' Component={Contactus} />
      <Route path='/about' Component={About} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
