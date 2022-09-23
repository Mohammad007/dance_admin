import React, { useEffect, useState } from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
import Footer from './shared/Footer';
import { userDetails } from '../services';
import Login from './user-pages/Login';

const App = () => {;
  const baseUrlLogin = window.location.pathname
  if(baseUrlLogin == '/'){
    return (
      <Login />
    )
  } else {
    return (
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
         <Sidebar/>
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
               <SettingsPanel/>
            </div>
             <Footer/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
