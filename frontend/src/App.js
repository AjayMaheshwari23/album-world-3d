import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState } from "react";
import MyAlert from "./components/MyAlert";
import Main from "./components/Main"
import View1 from "./components/View1";
import View2 from "./components/View2";

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
          <Route path="/View1" element={<View1 showAlert={showAlert} />} />
          <Route path="/View2" element={<View2 showAlert={showAlert} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
