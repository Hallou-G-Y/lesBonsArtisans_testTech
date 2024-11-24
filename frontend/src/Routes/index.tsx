import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from '../pages/login';
import Product from '../pages/product';


const index = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/"  element={<Login/>} />
                    <Route path="/product" element={<Product/>} />
                </Routes>
            </Router>
        </div>
    );
};

export default index;