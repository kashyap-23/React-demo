import React, { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom";
import Dropdown from "./Dropdown";
import Http from "../Http (1)";
// import Route from "../Route/routes";
// import { Route } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const name = localStorage.getItem("name");
  const [openprofile, setprofile] = useState(false)
  const navigat = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigat("/login")
  //   }
  // }, [])

  // let token = localStorage.getItem("token")
  // useEffect(() => {
  //   Http.setBearerToken(token)
  // },[])


  return (
    <>
      <div className="flex fixed h-screen w-full">
        <div className="  md:flex flex-col w-64 
        ">
          <div className="flex items-center gap-x-2     h-16   ">
            <div className="flex  items-center gap-x-4  ">
              <img src="http://octalinfotech.com/img/octal-logo.png" className="h-10 rounded-full" alt="" />
              <span className="  font-bold uppercase w-full"><h2>Octal Infotech</h2></span>
            </div>
            {/* <span>{Route.title}</span> */}

          </div >
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 shadow-xl bg-gray-800 ">

              <Link to="/admin/dashbord" className="flex items-center px-4 py-2 text-gray-100 hover:bg-red-700"><i className="fa-solid fa-house "></i>
                <span className="mx-2">Dashbord</span>
              </Link>
              <Link to="/admin/categories" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700"><i className="fa-solid fa-list"></i>
                <span className="mx-2">Categories</span>
              </Link>

              <Link to="/admin/users" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700"><i class="fa-solid fa-users"></i>
                <span className="mx-2">Users</span>
              </Link>
              <Link to="/admin/tags" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700"><i className="fa-solid fa-tags"></i>
                <span className="mx-2">Tags</span>
              </Link>
              <Link to="/admin/blogs" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700"><i class="fa-solid fa-box"></i>
                <span className="mx-2">Blogs</span>
              </Link>

            </nav>
          </div>
        </div>

        <div className="flex   flex-col flex-1 overflow-y-auto ">

          <div className="flex  bg-black items-center justify-between h-16 shadow-xl   bg-white border-b border-gray-200" style={{ position: 'fixed', width: "1663px" }}>
            <p></p>
            <div className="flex items-center  pr-4 " >

              <div className="absolute left-2 top-5 text-xxl">
                <span className="underline" ><b className="">{location.pathname.slice(7)}</b></span>
              </div>
              <button onClick={() => setprofile((prev) => !prev)}
                className=" items-center">
                <img src="https://ims-api.octalinfotech.com/images/avatar.png" className="h-10 rounded-full" alt="" />
              </button>

            </div>
          </div>
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
      {
        openprofile && <Dropdown />
      }

    </>
  );
}

export default Navbar