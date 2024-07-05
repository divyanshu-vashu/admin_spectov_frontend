import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,Navigate,RouterProvider,} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mainpage from './component/MainPage/Mainpage';
import Update from './component/Update/Update';
import Addnewcourse from './component/Addnewcourse/Addnewcourse';
import Login from './component/Login/Login';
const admin = localStorage.getItem("AdminEmail");

var temp=false;
	if (admin===process.env.REACT_APP_EMAIL)
	{
			temp=true;
	}


const router= createBrowserRouter([
  {
    path:"/",
    element: temp ?<Mainpage/>:<Navigate replace to="/login"/>,
  },
  {
    path:"/all-courses",
    element:temp?<Update/>:<Navigate replace to="/login"/>
  },
  {
    path:"/add-course",
    element:temp?<Addnewcourse/>:<Navigate replace to="/login"/>
  },
  {
    path:"/login",
    element:<Login/>
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>

);
reportWebVitals();