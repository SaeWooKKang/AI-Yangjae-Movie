import React from "react";
import { Routes, Route } from 'react-router-dom';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Review from "./components/Review";
import ReviewCreate from "./components/ReviewCreate";
import ReviewDetail from "./components/ReviewDetail";
import ReviewUpdate from "./components/ReviewUpdate";

function App() {
  return (
    <>
      <Header />
      <Routes>
        
        <Route path='/' element={ <Login /> } />

        {/* /review */}
        <Route path='review'> 
          <Route path='list' element={ <Review /> }/> 
          <Route path='create' element={ <ReviewCreate /> }/>

          {/* /review/:id */}      
          <Route path=':id'>
            <Route path='detail' element={ <ReviewDetail /> }/>
            <Route path='update' element={ <ReviewUpdate /> }/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
