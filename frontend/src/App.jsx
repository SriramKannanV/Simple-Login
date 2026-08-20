import React from "react";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={route} />;
};

export default App;
