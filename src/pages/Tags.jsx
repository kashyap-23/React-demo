import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';
import Model from '../Component/Model';
import axios from "axios";
import { toast } from 'react-toastify';
import Pagination from '../Component/Pagination';
// import Swal from "sweetalert2";
const url = (process.env.REACT_APP_API_KEY);

function Tags() {

  const [users, setUser] = useState();
  const [userInp, setuserInp] = useState({});
  const [Toggle, setToggle] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [search, setSearch] = useState("");
  // const [Category, setCategory] = useState();
  useEffect(() => {

    myFunction(search)

  }, [search])

  const openModal = () => {
    setshowModal(true);
  }

  const handleSerching = (event) => {
    setSearch(event.target.value);
  }


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setuserInp(values => ({ ...values, [name]: value }))
  }

  const HandleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    setuserInp('')

    const formData = new FormData();
    formData.append('name', userInp.name);

    axios.post("https://blog-api-dev.octalinfotech.com/api/tages/store", formData, {
      headers:
        { "Authorization": `Bearer ${token}` }
    })
      // Http.callApi('post', url +'categories/store')
      .then((response) => {

        const user = response.data.data.data;

        setuserInp(user)
        toast.success(response.data.message);
        setshowModal(false);
        myFunction()
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const getTags = (id) => {
    Http.callApi('get', url + `tages/${id}/show`)

      .then((response) => {
        const user = response.data.data;
        setuserInp(user)
        setshowModal(true);
        myFunction()
      })
      .catch((error) => {
        console.log(error);
      });

    setToggle(false);

  }


  const Update = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    
    formData.append('name', userInp.name);
    Http.callApi('post', url + `tages/${userInp.id}/update`, formData)
      .then((response) => {
        const user = response.data.data.data;
        setUser(user)
        toast.success(response.data.message);
        setshowModal(false);
        myFunction()
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message)
      });
    setToggle(true);
    setuserInp("")

  }


  const Delete = (id) => {

    console.log(id);
    setuserInp();
    Http.callApi('delete', url + `tages/${id}/delete`)
      .then((response) => {
        console.log(
          response
        );
        toast.success(response.data.message);
        myFunction()
      })


  }

  function myFunction(search = "") {
    Http.callApi('get', url + `tages?search=${search}`)
      .then((response) => {
        // setCategory(response.data.data.category);
        console.log(response);
        let users = response.data.data
        setUser(users)
        console.log(users);

      })
      .catch((error) => {
        console.log(error);

      });

  }

  return (
    <div className=''>
      <div className='border mt-5'>
        <div>
          <>
            <div className='flex justify-between gap-3 mt-2 mb-4'>
              <form>
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative ">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" onChange={handleSerching} className="h-3 mx-2 block w-full p-4 ps-10 text-sm  text-gray-900  border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Search Title" required />

                </div>
              </form>
              <button className='bg-gray-800 px-4 p-2 text-white rounded-lg hover:bg-gray-950 mx-5 m-2 ' id="main" onClick={openModal}  >New Tag</button>
            </div>
           
            <Model isVisible={showModal} onClose={() => setshowModal(false)} >
              <div className='p-4' >

                <h1 className='h3 text-center p-4 '>Add A Tag</h1>
                <form  >
                  <div>
                    <label htmlFor='Name'>Name:</label>
                    <input type="text" name='name' className='form-control' placeholder='Enter a your name' value={userInp?.name || ""}
                      onChange={handleChange} />
                  </div>
                  <br />
                  <br />
                  <div className='flex gap-x-9  pt-8 justify-end '>

                    <button className='bg-gray-600 px-3 py-2 rounded-lg text-white font-bold' onClick={() => setshowModal(false)} >Cancle</button>
                    {
                      Toggle ? <button onClick={HandleSubmit} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold'  >Add</button>
                        :
                        <button onClick={Update} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold '  >Update</button>
                    }

                  </div>
                </form>
              </div>
            </Model>
          </>
        </div>
      </div>

      <div className="">
        
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium ">
                  <tr>
                    <th scope="col" className=" py-2 text-2xl">#</th>
                    
                    <th scope="col" className=" py-2 text-2xl">Name</th>
                    <th scope="col" className=" text-2xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data?.map((data, index) => (
                    <tr className="border dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-3 font-medium">{index + 1}</td>
                      <td className="whitespace-nowrap px-6 py-3">{data.name}</td>
                      <i onClick={() => getTags(data.id)} className="fa-regular fa-pen-to-square mt-3  text-green-700 whitespace-nowrap px-6 py-3" role="button"></i>
                      <i onClick={() => Delete(data.id)} className="fa-solid fa-trash text-red-700 whitespace-nowrap px-6 py-3" role="button"></i>
                    </tr>
                  )
            )}
            <tr>
              <td className='text-end' colSpan={7}>
                <Pagination class="mt-6" links={users?.links} setUser={setUser} />
              </td>
            </tr>
                </tbody>
              </table>
            </div>
          </div>
       
  )
}

export default Tags;