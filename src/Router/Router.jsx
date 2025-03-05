import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Error from "../Shared/Error";
import HomePage from "../pages/Home/HomePage";
import NotesPage from "../pages/Notes/NotesPage";
import CodePage from "../pages/Code/CodePage";
import LinkPage from "../pages/Link/LinkPage";
import InterParsonal from "../pages/Interview/InterParsonal/InterParsonal";
import Theory from "../pages/Interview/Theory/Theory";
import ProblemSolving from "../pages/Interview/PSol/ProblemSolving";
import SignIn from "../Account/SignIn/SignIn";
import SignUp from "../Account/SignUp/SignUp";
import Account from "../Account/Account";
import Dashboard from "../Dashboard/Dashboard";
import AddTasks from "../Dashboard/AddTasks/AddTasks";
import PrivateRoute from "./PrivateRoute";
import { Home } from "lucide-react";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>
      },
      {
        path: "/account",
        element: <Account></Account>,
        children: [
          {
            path: "SignIn",
            element: <SignIn></SignIn>
          },
          {
            path: "SignUp",
            element: <SignUp></SignUp>
          },
        ]
      },
      {
        path: "/interview/InterParsonal",
        element: <InterParsonal></InterParsonal>
      },
      {
        path: "/interview/theory",
        element: <Theory></Theory>
      },
      {
        path: "/interview/problem-solving",
        element: <ProblemSolving></ProblemSolving>
      },
      {
        path: "/note",
        element: <NotesPage></NotesPage>
      },
      {
        path: "/code",
        element: <CodePage></CodePage>
      },
      {
        path: "/link",
        element: <LinkPage></LinkPage>
      },
      
    ]
    
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <AddTasks></AddTasks>
      }
    ]
  },
]);


export default Router;