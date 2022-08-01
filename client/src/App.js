import React from "react";
import { Routes, Route } from 'react-router-dom';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import ReviewList from "./components/ReviewList";
import ReviewCreate from "./components/ReviewCreate";
import ReviewDetail from "./components/ReviewDetail";
import ReviewUpdate from "./components/ReviewUpdate";

import Store from "./app/store";
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={Store}>
        <Header />
        <Routes>
          
          <Route path='/' element={ <Login /> } />

          {/* /review */}
          <Route path='review'> 
            <Route path='list' element={ <ReviewList /> }/> 
            <Route path='create' element={ <ReviewCreate /> }/>

            {/* /review/:id */}      
            <Route path=':id'>
              <Route path='detail' element={ <ReviewDetail /> }/>
              <Route path='update' element={ <ReviewUpdate /> }/>
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
