import React from "react";
 import { Routes, Route } from "react-router-dom"
// import Navbar from "../Component/Navbar";
import Categories from "../pages/Categories";
import Blogs from "../pages/Blogs";
import Users from "../pages/Users";
import Login from "../Component/Login";
import Dashbord from "../pages/Dashbord";
import Tags from "../pages/Tags";


const routes = [

  {
    path: "/login",
    component: <Login />,
  },
  // {
  //   path: "/",
  //   component: <Navbar />,
  // },
  {
    path: "/admin/dashbord",
    component: <Dashbord />,
  },
  {
    path: "/admin/categories",
    component: <Categories />,
  },
  {
    path: "/admin/blogs",
    component: <Blogs />,
  },
  {
    path: "/admin/users",
    component: <Users />,
  },
  {
    path: "/admin/tags",
    component: <Tags />,
  },

]

export default routes;
