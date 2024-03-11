
import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';
import Store from "../Store/Store";

const url = (process.env.REACT_APP_API_KEY);

function Dashbord() {

    // const name = localStorage.getItem("name");

    const [User, setUser] = useState();
    const [Category, setCategory] = useState();
    const [Blog, setBlog] = useState()
    const [Tags, setTags] = useState()
    const loginData = Store((state) => state.data)
    const token = Store((state) => state.token)
    const LogoinName = JSON.stringify(loginData.name)

    useEffect(() => {
        // console.log(JSON.stringify(loginData.name));

        // axios.get("https://blog-api-dev.octalinfotech.com/api/dashboard",
        //     { headers: { "Authorization": `Bearer ${token}` } })

        Http.callApi('get', url + 'dashboard')
            .then((response) => {

                setUser(response.data.data.user);
                setCategory(response.data.data.category);
                setBlog(response.data.data.blog);
                setTags(response.data.data.tag);



            })
            .catch((error) => {
                console.log(error);

            });

    }, [])

    return (
        <div className='mt-4 mx-3'>
            <div>
                <div>

                    <div className='text-blue-900 h1 p-4'>
                        <div><img src="" alt="" /></div>
                        <div>
                            <h1 className='colors-blue font-serif'>Good Afternoon, {LogoinName} </h1>

                        </div>
                    </div>

                    <div className='grid lg:grid-cols-3 w-full gap-10 md:grid-cols-2  md:h-64 '>

                        <div className='bg-blue-100 drop-shadow-xl text-center flex items-center text-2xl border-b-8 border-blue-500 p-3 shadow-black  font-semibold shadow-md max-md:p-8'>
                            <div className='flex gap-x-7 '>
                                <h1 className='text-blue-500'> Categories</h1>
                                <span className=' font-bold'>{Category}</span>
                            </div>
                        </div>

                        <div className='bg-teal-100 h3  text-center border-b-8 border-teal-500 flex items-center font-semibold shadow-md p-3 shadow-black max-md:p-8'>
                            <div className='flex gap-x-7 '>
                                <h1 className='text-teal-500 '>Users</h1>
                                <span className=' font-bold'>{User}</span>
                            </div>
                        </div>

                        <div className='bg-orange-100 h3   text-center border-b-8 border-orange-500 flex items-center font-semibold  shadow-md p-3 shadow-black max-md:p-8 '>
                            <div className='flex gap-x-7 '>
                                <h1 className='text-orange-500'>Blogs</h1>
                                <span className=' font-bold'>{Blog}</span>
                            </div>
                        </div>

                        <div className='bg-rose-100 h3  text-center border-b-8 border-rose-500 flex items-center  font-semibold shadow-md p-3 shadow-black max-md:p-8'>
                            <div className='flex gap-x-7 '>
                                <h1 className='text-rose-500'>Tags</h1>
                                <span className=' font-bold'>{Tags}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Dashbord
