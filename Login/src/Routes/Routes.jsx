import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Menu from "../MenuPage/Menu";
import UpdateProfile from "../Components/Profile/UpdateProfile";
import CreateProfile from "../Components/Profile/CreateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/createProfile",
        element: <CreateProfile></CreateProfile>,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },
    ],
  },
]);
