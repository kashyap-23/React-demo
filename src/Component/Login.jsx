import React, { useState } from "react";
import "./index.css";

import { useNavigate } from "react-router-dom";
import Http from "../Http (1)";
import { toast } from 'react-toastify';


const url = (process.env.REACT_APP_API_KEY)
function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlesubmit = (event) => {
    localStorage.setItem("name", "kashyap");
    event.preventDefault();

    let payload = { email, password };

    // const App = () => {

    // }



    // axios
    //   .post(`https://blog-api-dev.octalinfotech.com/api/login`, payload)
    Http.callApi('post', url + "login", payload)
      .then((response) => {
     
        localStorage.setItem("token", response.data.data.token);
        Http.setBearerToken(response.data.data.token);
        toast.success(response.data.message);
        // toast("Login Successfull");
        navigate("/admin/dashbord ")

      }).catch((error) => {
        // console.error(error, 'kishan');
        toast.error(error?.response?.data?.message)
      })


  };

  return (
    <>

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-2/5 h-8 mr-2" src="https://lh3.googleusercontent.com/p/AF1QipOMj-dseZ54sUzotNCrFSHiBnOGUrpI64eCxSzM=s680-w680-h510" alt="logo"/>
              Octal 
          </a> */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input value={email}
                    onChange={handleEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input value={password}
                    onChange={handlePassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <div className="flex items-center justify-between">
                </div>
                <a onClick={handlesubmit}
                 href="#_" className="inline-block py-2 text-xl text-white bg-red-800 px-7 hover:bg-green-700 rounded-xl">
                  login
                </a>
              
              </form>
            </div>
          </div>
        </div>
      </section>
 
    </>
  );
}

export default Login;
