import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';
import Model from '../Component/Model';
import axios from "axios";
import { toast } from 'react-toastify';
// import Swal from "sweetalert2";
const url = (process.env.REACT_APP_API_KEY);

function Blogs() {

  const [users, setUser] = useState();
  const [userInp, setuserInp] = useState({});
  const [Toggle, setToggle] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [UserApi, setUserApi] = useState([]);
  const [categoriesApi, setcategoriesApi] = useState([]);
  const [search, setSearch] = useState("");


  // const [Category, setCategory] = useState();
  useEffect(() => {

    myFunction(search)

  }, [search])

  const handleSerching = (event) => {
    setSearch(event.target.value);
  }


  const openModal = () => {
    setshowModal(true);
  }

  useEffect(() => {
    Http.callApi('get', url + `users`)

      .then((response) => {
        const user = response.data.data.data;
        setUserApi(user)
        console.log(user);
        myFunction()

      })
      .catch((error) => {
        console.log(error);
      });


    setToggle(false);
  }, [])

  useEffect(() => {
    Http.callApi('get', url + `categories`)

      .then((response) => {
        const categories = response.data.data.data;
        setcategoriesApi(categories)
        console.log(categories);
        myFunction()

      })
      .catch((error) => {
        console.log(error);
      });


    setToggle(true);
  }, [])


  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    setuserInp(values => ({ ...values, [name]: value }))
  }

  console.log();


  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const HandleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    setuserInp('')

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('user_id', userInp.user_id);
    formData.append('title', userInp.title);
    formData.append('description', userInp.description);
    formData.append('category_id', userInp.category_id);
    formData.append('date', userInp.date);
    formData.append('status', userInp.status);

    axios.post("https://blog-api-dev.octalinfotech.com/api/blogs/store", formData, {
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

  const getCategories = (id) => {
    Http.callApi('get', url + `blogs/${id}/show`)

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
    formData.append('image', selectedFile);
    formData.append('user_id', userInp.user_id);
    formData.append('title', userInp.title);
    formData.append('description', userInp.description);
    formData.append('category_id', userInp.category_id);
    formData.append('date', userInp.date);
    formData.append('status', userInp.status);
    Http.callApi('post', url + `blogs/${userInp.id}/update`, formData)
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
    Http.callApi('delete', url + `blogs/${id}/delete`)
      .then((response) => {
        console.log(
          response
        );
        toast.success(response.data.message);
        myFunction()
      })


  }

  function myFunction(search = "") {
    Http.callApi('get', url + `blogs?search=${search} `)
      .then((response) => {
        // setCategory(response.data.data.category);
        console.log(response);
        let users = response.data.data.data
        setUser(users)
        console.log(users);

      })
      .catch((error) => {
        console.log(error);

      });

  }

  return (
    <div>
      <div className=' flex justify-between  border border-black  p-5 '>
        <h1 className='h2'>Blogs</h1>
        <div>
          <>

            <form>
              <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" >Search</label>
              <div className="relative border-blue-500">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" onChange={handleSerching} className="mx-2 block w-full p-4 ps-10 text-sm  text-gray-900  border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Search here" required />

              </div>
            </form>

            <button className='bg-gray-800 px-4 p-2 text-white rounded-lg mx-2 ' id="main" onClick={openModal}  >New Blog</button>
            <Model isVisible={showModal} onClose={() => setshowModal(false)} >
              <div className='p-4' >

                <h1 className='h3 text-center p-4 '>Add A Blog</h1>
                <form  >
                  <div className='flex gap-10 gap-x-24'>
                    <div>
                      <div>
                        <label htmlFor='UserName'>User:</label>
                        <select className="form-control p-2 border-b-blue " name="user_id" onChange={handleChange} value={userInp?.user_id || ""}>
                          {
                            UserApi.map((data) => (
                              <option value={data.id}>{data.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <br />
                      <div>
                        <label htmlFor='Title'>Title:</label>
                        <input type="text" name='title' className='form-control' placeholder='Enter a your title' value={userInp?.title || ""}
                          onChange={handleChange} />
                      </div>
                      <br />

                      <div>
                        <label htmlFor='Date'>Date:</label>
                        <input type="date" name='date' className='form-control' placeholder='Enter a your date' value={userInp?.date || ""}
                          onChange={handleChange} />
                      </div>
                      <br />
                      <div>
                        <label htmlFor='Categoriey'>Category:</label>
                        <select className="form-control p-2" name="category_id" onChange={handleChange} value={userInp?.category_id || ""}>
                          {
                            categoriesApi.map((data) => (
                              <option value={data.id}>{data.name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor='Status'>Status:</label>

                        <select className="form-control p-2" name='status' onChange={handleChange} value={userInp?.status || ""}>

                          <option value={0}></option>
                          <option value={1}>publish</option>
                          <option value={2}>unpblish</option>

                        </select>
                      </div>
                      <br />
                      <div>
                        <label htmlFor='Image'>Image:</label>
                        <input type="file" name='file' className='form-control' placeholder='Enter a your image'
                          onChange={handleFileUpload} />
                      </div>
                      <br />
                      <div>
                        <label htmlFor='description'>Discription:</label>
                        <textarea name="description" id="" cols="10" rows="5" className='form-control' placeholder='Enter a your Discription' value={userInp?.description || ""}
                          onChange={handleChange}></textarea>
                        {/* <input type="text" name='description' className='form-control' placeholder='Enter a your Discription' value={userInp?.description || ""}
                        onChange={handleChange} /> */}
                      </div>
                      <br />
                      <div className='flex gap-x-9  pt-8 justify-end '>

                        <button className='bg-gray-600 px-3 py-2 rounded-lg text-white font-bold' onClick={() => setshowModal(false)} >Cancle</button>
                        {
                          Toggle ? <button onClick={HandleSubmit} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold '>Add</button>
                            :
                            <button onClick={Update} className='bg-gray-800 px-3 py-2 rounded-lg text-white font-bold '>Update</button>
                        }

                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Model>
          </>
        </div>
      </div>


      <div className="border-2 border-black-600">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium ">
            <tr>
              <th scope="col" className=" py-2 text-2xl">#</th>
              <th scope="col" className=" py-2 text-2xl">Image</th>
              <th scope="col" className=" py-2 text-2xl">UserName</th>
              <th scope="col" className=" py-2 text-2xl">Title</th>
              <th scope="col" className=" py-2 text-2xl">Category</th>
              <th scope="col" className=" py-2 text-2xl">Date</th>
              <th scope="col" className=" py-2 text-2xl">Status</th>
              <th scope="col" className=" text-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((data, index) => (
              <tr className="border dark:border-neutral-500 ">
                <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-2 w-9"><img src={data.image} alt="" /></td>
                <td className="whitespace-nowrap px-6 py-2">{data.user_name}</td>
                <td className="whitespace-nowrap px-6 py-2">{data.title}</td>
                <td className="whitespace-nowrap px-6 py-2">{data.category_name}</td>
                <td className="whitespace-nowrap px-6 py-2">{data.date}</td>
                <td className="whitespace-nowrap px-6 py-2"><span className={data.status === 1 ? "bg-green-700 p-2 rounded-pill text-white px-4" : "bg-red-700 p-2 rounded-pill text-white px-4"}>{data.status === 1 ? "Publish" : "Unpublish"}</span></td>
                <div className='flex items-center text-center mt-4 justify-center space-x-7 '>
                  <div >
                    <td>
                      <i onClick={() => getCategories(data.id)} className="fa-solid fa-pen-to-square text-green-700 hover:text-slate-700 text-2xl" role="button"></i>
                    </td>
                  </div>
                  <div className='flex justify-center items-center'>
                    <td>
                      <i onClick={() => Delete(data.id)} className="fa-solid fa-trash text-red-700 text-2xl hover:text-slate-700" role="button"></i>
                    </td>
                  </div>
                </div>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Blogs;