import {
  createBrowserRouter,
} from "react-router-dom";


import WelcomePage from "../pages/WelcomePage";
import SignUpPage from "../pages/SignUpPage";

export const router = createBrowserRouter([
  { path: "/", element: <WelcomePage />},
  { path: "/signup", element: <SignUpPage/>},
]);