import React, { useState } from "react";
import "./index.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlesubmit = (event) => {
    localStorage.setItem("name", "ere");
    event.preventDefault();
    let payload = { email, password };

    axios
      .post(`https://blog-api-dev.octalinfotech.com/api/login`, payload)
      .then((response) => {
        console.log(response.data.message);
        localStorage.setItem("token", response.data.data.token);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios.post(`https://blog-api-dev.octalinfotech.com/api/login`, payload).than((response) => {
    //         localStorage.setItem('token',response.data.token);
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
  };

  return (
    <>
      <div className="register-photo">
        <div className="form-container">
          <form style={{ border: "2px solid black" }}>
            <div style={{ display: "flex", gap: "150px" }}>
              <div className="image-holder">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipOMj-dseZ54sUzotNCrFSHiBnOGUrpI64eCxSzM=s680-w680-h510"
                  alt="" style={{width:"350px" , display:"flex"}}
                />
              </div>
              <div>
                <h2 className="text-center">
                  <strong>Login</strong> an account.
                </h2>
                <div className="form-group">
                  <input
                    value={email}
                    onChange={handleEmail}
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={password}
                    onChange={handlePassword}
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <button
                    onClick={handlesubmit}
                    className="btn btn-primary btn-block"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
