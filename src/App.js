
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import Dashboard from "./Component/Dashboard";
// import { Route } from "react-router-dom";
import Route from "./Route/index";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Http from "./Http (1)";


function App() {
  let token = localStorage.getItem("token")
  useEffect(() => {
    Http.setBearerToken(token)
  }, [])
  return (
    < >
      <BrowserRouter>
        {/* <Dashboard /> */}
        <Route />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
