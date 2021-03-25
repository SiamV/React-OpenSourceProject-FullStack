import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './adminRouter.module.css'

const AdminRouter = () => {
    return (
        <div className={classes.wrapper}>
            <ul>
                <li><NavLink to={'/admin/my-editor'}> Page Editor</NavLink></li>
                <li><NavLink to={'/admin/tour-order'}>My order</NavLink></li>
            </ul>
        </div>
    )
}

export default AdminRouter;