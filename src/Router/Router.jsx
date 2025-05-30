import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Error from "../Shared/Error";
import HomePage from "../pages/Home/HomePage";
import NotesPage from "../pages/Notes/NotesPage";
import CodePage from "../pages/Code/CodePage";
import LinkPage from "../pages/Link/LinkPage";
import Theory from "../pages/Interview/Theory/Theory";
import SignIn from "../Account/SignIn/SignIn";
import SignUp from "../Account/SignUp/SignUp";
import Account from "../Account/Account";
import Dashboard from "../Dashboard/Dashboard";
import AddTasks from "../Dashboard/AddTasks/AddTasks";
import PrivateRoute from "./PrivateRoute";
import { Home } from "lucide-react";
import History from "../Dashboard/History/History";
import AddInterviewFAQ from "../Dashboard/InterviewFAQ/AddInterviewFAQ";
import InterviewFAQ from "../pages/InterviewFAQ/InterviewFAQ";
import InterviewFAQspublic from "../pages/InterviewFAQ/InterviewFAQspublic";
import DashInterViewFAQs from "../Dashboard/InterViewFAQs/DashInterViewFAQs";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import AiInterview from "../pages/Ai/AiInterview/AiInterview";
import Trackify from "../pages/Trackify/Trackify";
import PostTask from "../pages/Trackify/StepTrack/ForTrack/PostTask";


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
        path: "/about",
        element: <AboutUs></AboutUs>
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>
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
        path: "/my-InterviewFAQ",
        element: <PrivateRoute><InterviewFAQ></InterviewFAQ></PrivateRoute>
      },
      {
        path: "/ai-Interview",
        element: <PrivateRoute><AiInterview></AiInterview></PrivateRoute>
      },
      {
        path: "/InterviewFAQs",
        element: <InterviewFAQspublic></InterviewFAQspublic>
      },
      // {
      //   path: "/interview/InterParsonal",
      //   element: <InterParsonal></InterParsonal>
      // },
      {
        path: "/interview/theory",
        element: <Theory></Theory>
      },
      {
        path: "/Trackify",
        element: <Trackify></Trackify>
      },
      {
        path: "/Trackify/Addtask",
        element: <PostTask></PostTask>
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
        path: "/dashboard/AddTask",
        element: <AddTasks></AddTasks>
      },
      {
        path: "/dashboard/AddInterviewFAQ",
        element: <AddInterviewFAQ></AddInterviewFAQ>
      },
      {
        path: "/dashboard/DashInterViewFAQs",
        element: <DashInterViewFAQs></DashInterViewFAQs>
      },
      {
        path: "/dashboard/History",
        element: <History></History>
      },
      
    ]
  },
]);


export default Router;