import {
  createBrowserRouter,
} from "react-router-dom";

import App from "../App";
import WelcomePage from "../pages/WelcomePage";
// import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <WelcomePage />},
  { path: "/App", element: <App/>},
]);