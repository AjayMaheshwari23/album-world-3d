import "./App.css";
import React from "react";
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState } from "react";
import MyAlert from "./components/MyAlert";
import View1 from "./components/View1";
import View2 from "./components/View2";
import Main from "./components/Main";
import Starfield from "./components/Starfield";
import  UserContext, { UserContextProvider }  from "./UserContext";
import Floatbtn from "./components/molecules/Floatbtn";

function App() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type, flag) => {
    setAlert({
      msg: message,
      type: type,
      flag: 1,
    });
  };

  return (
    <>
      <BrowserRouter>
        <MyAlert alert={alert} />

        <Routes>
          <Route
            element={
              <Starfield>
                <Outlet />
                <Floatbtn showAlert={showAlert} />
              </Starfield>
            }
          >
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route
              path="/Signin"
              element={
                <UserContextProvider value={{ user, setUser }}>
                  <Signin showAlert={showAlert} />
                </UserContextProvider>
              }
            />
            <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
            <Route
              path="/Main"
              element={
                <UserContextProvider value={{ user, setUser }}>
                  <Main showAlert={showAlert} />
                </UserContextProvider>
              }
            />
            <Route path="/View1" element={<View1 showAlert={showAlert} />} />
            <Route
              path="/View2"
              element={
                <UserContextProvider value={{ user, setUser }}>
                  <View2 showAlert={showAlert} />
                </UserContextProvider>
              }
            />
            <Route
              path="/View1"
              element={
                <UserContextProvider value={{ user, setUser }}>
                  <View1 showAlert={showAlert} />
                  <Floatbtn showAlert={showAlert} />
                </UserContextProvider>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
