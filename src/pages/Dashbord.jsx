
import React, { useEffect, useState } from 'react'
import Http from '../Http (1)';

const url = (process.env.REACT_APP_API_KEY);

function Dashbord() {
    
    const name = localStorage.getItem("name");

    const [User, setUser] = useState();
    const [Category, setCategory] = useState();
    const [Blog, setBlog] = useState()
    const [Tags, setTags] = useState()

    useEffect(() => {

       
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
        <div className=' mx-auto'>
            <div>
                <div>
                    <div>

                    </div>
                    <div className='text-blue-900 h1 p-4'>
                        <div><img src="" alt="" /></div>
                        <div>
                            <h1 className='colors-blue'>Good Afternoon, {name} </h1>
                           
                        </div>
                    </div>
                  
                    <div className='md:flex md:flex-row flex-col gap-x-9 flex-wrap container  max-lg:flex-none justify-around gap-y-9 pt-16'>

                        <div className='bg-blue-100 drop-shadow-xl w-1/3 text-center border-b-8 border-blue-500  shadow-black p-9 h3  font-mono shadow-md'>
                            <div className='flex gap-x-7 '>
                                <h1 className='text-blue-500'> Categories</h1>
                                <span className=' font-bold'>{Category}</span>
                            </div>
                        </div>

                        <div className='bg-teal-100 h3  w-1/3 text-center border-b-8 border-teal-500  font-mono shadow-md  shadow-black p-9 h3'>
                            <div className='flex gap-x-7 '>
                                <h1 className='text-teal-500 '>Users</h1>
                                <span className=' font-bold'>{User}</span>
                            </div>
                        </div>

                        <div className='bg-orange-100 p-9 h3   w-1/3 text-center border-b-8 border-orange-500  font-mono  shadow-md  shadow-black p-9 h3'>
                            <div className='flex gap-x-7 '>
                                <h1 className='text-orange-500'>Blogs</h1>
                                <span className=' font-bold'>{Blog}</span>
                            </div>
                        </div>

                        <div className='bg-rose-100 p-9 h3  w-1/3 text-center border-b-8 border-rose-500   font-mono shadow-md  shadow-black p-9 h3'>
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
