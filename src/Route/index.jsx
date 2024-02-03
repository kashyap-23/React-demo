import React from 'react'
import { Routes, Route } from "react-router-dom";
import routess from './routes';
import Navbar from '../Component/Navbar';
import Login from '../Component/Login';
import Frontpage from '../Frontendweb/Frontpage';

const RoutePage = () => {

    return (
        <Routes>
            <Route path="/" element={<Frontpage/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Navbar />}>
                {routess.map((route, index) => (
                    <Route
                        path={route.path}
                        element={route.component}
                        key={index}
                        title={route.title}
                    > </Route>
                ))}
            </Route>
        </Routes>
    );

}

export default RoutePage;
