import Carousel from "./Carousel"
import React from 'react'
import { Link } from "react-router-dom";
import Fblog from "./Fblog";
import Fcarosusel from "./Fcarousel";
import Footer from "./Footer";
function Frontpage() {
    return (
        <>
            <div className="flex   flex-col">

                <div className="bg-black p-4 shadow-xl  bg-white border-b border-gray-200 z-50 w-full fixed">
                    <div className="flex items-center mx-36 justify-evenly">
                        <p></p>
                        <div className="flex items-center pr-4" >

                            <div className="absolute left-52 text-xxl">
                                <img src="	https://blog-dev.octalinfotech.com/img/octal_infotech-logo_480.f7cd037c.png" alt="" className='w-44' />
                            </div>

                        </div>
                        <div>
                            <nav className="">

                                <Link to="" >
                                    <span className="mx-3">Home</span>
                                </Link>
                                <Link to="" >
                                    <span className="mx-3">Blogs</span>
                                </Link>

                                <Link to="">
                                    <span className="mx-3">Contact us</span>
                                </Link>

                            </nav>


                        </div>
                    </div>
                    <form className="flex absolute right-56 top-3  w-56">

                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                                </svg>
                            </div>
                            <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="search something" required />

                        </div>

                    </form>
                </div>
                <div>


                </div>
            </div>
            <section>
                <Carousel />
                <Fblog />
                <Fcarosusel />
                <Footer />
            </section>
        </>
    )
}

export default Frontpage
