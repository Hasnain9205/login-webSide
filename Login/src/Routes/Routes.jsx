import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Menu from "../MenuPage/Menu";
import UpdateProfile from "../Components/Profile/UpdateProfile";
import CreateProfile from "../Components/Profile/CreateProfile";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import ResetPassword from "../Components/ResetPassword/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/menu", element: <Menu /> },
      { path: "/createProfile", element: <CreateProfile /> },
      { path: "/updateProfile", element: <UpdateProfile /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:id/:token", element: <ResetPassword /> },
    ],
  },
]);
