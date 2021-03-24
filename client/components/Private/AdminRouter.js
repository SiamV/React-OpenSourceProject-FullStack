import React from 'react';
import {NavLink} from 'react-router-dom';

const AdminRouter = () => {
    return (
        <div>
            <li><NavLink to={'/my-editor'}> Page Editor</NavLink></li>
            <li><NavLink to={'/tour-order'}>My order</NavLink></li>
        </div>
    )
}

export default AdminRouter;