import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../components/layout/Layout";

import WelcomePage from "../pages/WelcomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import EnterDirectly from "../pages/EnterDirectly";
import Transactions from "../pages/Transactions";
import TransactionDetailPage from "../pages/TransactionDetailPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <WelcomePage />},
      { path: "/signup", element: <SignUpPage/>},
      { path: "/login", element: <LoginPage/>},
      { path: "/main", element: <MainPage/>},
      { path: "/add", element: <EnterDirectly/>},
      { path: "/transactions", element: <Transactions/>},
      { path: "/transaction/:id", element: <TransactionDetailPage/>},
    ]
  }
]);