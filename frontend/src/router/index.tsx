import {
  createBrowserRouter,
} from "react-router-dom";


import WelcomePage from "../pages/WelcomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import EnterDirectly from "../pages/EnterDirectly";

export const router = createBrowserRouter([
  { path: "/", element: <WelcomePage />},
  { path: "/signup", element: <SignUpPage/>},
  { path: "/login", element: <LoginPage/>},
  { path: "/main", element: <MainPage/>},
  { path: "/add", element: <EnterDirectly/>},
]);