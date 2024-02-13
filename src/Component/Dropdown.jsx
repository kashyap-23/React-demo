import React from 'react'
import { useNavigate } from 'react-router-dom';

function Dropdown() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    console.log('logout')
    navigate("/login")
  }
  

  return (
      <>
          <div className='flex flex-col dropDownprofile'>
              <ul style={{backgroundColor : "white"}} className='flex flex-col gap-4'>
                  <li> <b>Profile</b></li>
                  <li><b>Change Password</b></li>
          <li><button onClick={logout} ><b>Logout</b></button></li>
              </ul>
          </div>

    </>
  )
}

export default Dropdown;
