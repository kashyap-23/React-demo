import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';
import Model from '../Component/Model';
import axios from "axios";
import { toast } from 'react-toastify';
import Pagination from '../Component/Pagination';
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
  const [StatusSearchFilter, setStatusSearchFilter] = useState('');
  const [usersfilter, setusersfilter] = useState('');
  const [catagoriesfilter, setcatagoriesfilter] = useState('');


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

  function myFunction(search = "", StatusSearchFilter = '', usersfilter = '', catagoriesfilter = '') {
    Http.callApi('get', url + `blogs?search=${search}&status=${StatusSearchFilter}&user_id=${usersfilter}&category_id=${catagoriesfilter}`)
      .then((response) => {
    
        let users = response.data.data
        setUser(users)

      })
      .catch((error) => {
        console.log(error);

      });

  }

  useEffect(() => {

    myFunction(search, StatusSearchFilter, usersfilter, catagoriesfilter,)

  }, [search, StatusSearchFilter, usersfilter, catagoriesfilter,])

  const StatusFilter = (event) => {
    setStatusSearchFilter(event.target.value)
  }

  function userfilt(event) {
    setusersfilter(event.target.value)
  }

  function catagoriesfi(event) {
    setcatagoriesfilter(event.target.value)
  }




  return (
    <div>
      <div className=' border mt-5'>
        
        <div>
          <>

            <div className='flex  justify-between items-center'>

              <div>
                <div className=" flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-100 overflow-hidden">
                  <div className="grid place-items-center h-full w-12">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <input onChange={handleSerching}
                    className="peer h-full w-full outline-none text-sm bg-slate-100 text-gray-700 bg-s pr-2 border-none" type="text"
                    placeholder="Search Title.." />
                </div>
              </div>

              <div className='flex gap-3 mt-2 mb-4 '>

                <select className='  border-1 border-gray-400 m-2 py-2 rounded-lg' name="" id="" onChange={StatusFilter}>

                  <option value="">All Status</option>
                  <option value="1">Publish <i class="fa-solid fa-xmark"></i></option>
                  <option value="2">Unpublish <i class="fa-solid fa-xmark"></i></option>

                </select>

                <select className='p-2  border-1 border-gray-400 m-2  rounded-lg' name='user_id' onChange={userfilt}  >
                  <option value="">All Users</option>
                  {
                    UserApi.map((data, indax) => (
                      <option value={data.id}>{data.name}</option>
                    ))
                  }
                </select>

                <select className='py-2  border-1 border-gray-400 m-2  rounded-lg' name='user_id' onChange={catagoriesfi}  >
                  <option value="">All Catagories</option>
                  {
                    categoriesApi.map((data, indax) => (
                      <option value={data.id}>{data.name}</option>
                    ))
                  }
                </select>

                <button className='bg-gray-800 px-4 text-white rounded-lg  mx-5 m-2' id="main" onClick={openModal}  >+ New Blog</button>
              </div>
            </div>

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
                      <div className=''>
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


      <div className=" border-black-600">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b font-medium ">
            <tr>
              <th scope="col" className=" py-2 text-2xl">#</th>
              <th scope="col" className=" py-2 text-2xl">Image</th>
              <th scope="col" className=" py-2 text-2xl">User</th>
              <th scope="col" className=" py-2 text-2xl">Title</th>
              <th scope="col" className=" py-2 text-2xl">Category</th>
              <th scope="col" className=" py-2 text-2xl">Date</th>
              <th scope="col" className=" py-2 text-2xl">Status</th>
              <th scope="col" className=" text-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((data, index) => (
              <tr className="border dark:border-neutral-500 ">
                <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-2 w-9"><img src={data.image} className='w-32 h-[30px] rounded-full' alt="" /></td>
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

export default Blogs;