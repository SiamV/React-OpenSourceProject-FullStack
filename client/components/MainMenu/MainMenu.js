import React from 'react';
import { NavLink } from 'react-router-dom';


const MainMenu = () => {
    return (
            <nav class="ml-10 flex items-baseline space-x-4">
                <NavLink to={'/articles'} className="border border-indigo-500 bg-green-700 text-white rounded-md p-1 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Articles</NavLink>
                <NavLink to={'/tours'} className="border border-indigo-500 bg-green-700 text-white rounded-md p-1 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Tours</NavLink>
            </nav>
    )
}

export default MainMenu;