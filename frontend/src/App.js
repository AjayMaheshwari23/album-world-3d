import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState } from "react";
import MyAlert from "./components/MyAlert";
import Main from "./components/Main"

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type,flag) => {
    setAlert({
      msg: message,
      type: type,
      flag:1,
    });
    // setTimeout(() => {
    //   setAlert(null);
    // }, 1500);
  };

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Router>
        <MyAlert alert={alert} />
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/Signin" element={<Signin showAlert={showAlert} />} />
          <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/Main" element={<Main showAlert={showAlert} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
