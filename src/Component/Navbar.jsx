import React, { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Http from "../Http (1)";


function Navbar() {
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
        <div className="  md:flex flex-col w-64  ">
          <div className="flex items-center gap-x-2   justify-center h-16   ">
            <img src="http://octalinfotech.com/img/octal-logo.png" className="h-10 rounded-full" alt="" />
            <span className="  font-bold uppercase"><h2>Octal Infotech</h2></span>
          </div >
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 shadow-xl bg-gray-800 ">

              <Link to="/admin/dashbord" className="flex items-center px-4 py-2 text-gray-100 hover:bg-red-700">
                Dashbord
              </Link>
              <Link to="/admin/categories" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700">
                Categories
              </Link>
              <Link to="/admin/blogs" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700">
                Blogs
              </Link>
              <Link to="/admin/users" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700">
                Users
              </Link>
              <Link to="/admin/tags" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-red-700">
                Tags
              </Link>

            </nav>
          </div>
        </div>

        <div className="flex   flex-col flex-1 overflow-y-auto ">
          <div className="flex  bg-black items-center justify-between h-16 shadow-xl   bg-white border-b border-gray-200" style={{ position: 'fixed', width: "1663px" }}>
            <p></p>
            <div className="flex items-center pr-4 " >

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