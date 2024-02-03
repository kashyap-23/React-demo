import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser } from 'react-icons/fa';

function Fblog() {

    const [Users, setUsers] = useState([]);
    // const [BlogsShow, setBlogsShow] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('token')
        axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs`,
            { headers: { "Authorization": `Bearer ${token}` } })

            .then((response) => {
                const user = response.data.data.data;
                setUsers(user)

            })
            .catch((error) => {
                console.log(error);
            });
    }, [1000])




    return (
        <div>

            <div className='flex flex-wrap   justify-center container  gap-y-14 gap-x-12'>
                {
                    Users.map((data, index) => (
                        <div className='cursor-pointer bg-slate-50 shadow-md  shadow-gray-400'>
                            <Link to={`blogview/${data.id}`}>
                                <div>
                                    <img src={data.image} className='  w-[350px] h-[230px] object-cover items-center flex justify-center rounded  ' alt="alert" />

                                </div>
                                <div className='flex items-center gap-x-3 gap-y-14 mt-3 justify-between mx-2  '>
                                    <div className='flex items-center gap-x-2'>
                                        <div>{/*<img src={data.user_image} alt="" className='h-5 w-5 rounded-full' />*/} <FaUser /> </div>
                                        <div>{data.user_name}</div>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <div> <FaCalendar /> </div>
                                        <div> {data.date}</div>
                                    </div>
                                </div>
                                <div className='mt-2 py-4'>
                                    <h1 className='h4 text-center'>{data.title}</h1>
                                </div>
                            </Link>

                            {/* <div>{data.description}</div> */}


                        </div>
                    ))
                }
            </div>




        </div>
    )
}

export default Fblog
