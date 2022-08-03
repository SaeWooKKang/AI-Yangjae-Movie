import React from "react";
import { Routes, Route } from 'react-router-dom';

import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import ReviewList from "./components/ReviewList";
import ReviewCreate from "./components/ReviewCreate";
import ReviewDetail from "./components/ReviewDetail";
import ReviewUpdate from "./components/ReviewUpdate";

// Social
import KakaoCallback from "./pages/kakao/KakaoCallback";
import SocialSignUp from "./pages/user/SocialSignUp";

// Redux
import Store from "./app/store";
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={Store}>
        <Header />
        <Routes>
          
          <Route path='/' element={ <Login /> } />
          
          <Route path='oauth'>
            <Route path='kakao/callback' element={ <KakaoCallback /> } />
            <Route path='signup' element={<SocialSignUp />} />
          </Route>

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
