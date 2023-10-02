import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Signin from "./components/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Signin",
    element: <Signin />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
