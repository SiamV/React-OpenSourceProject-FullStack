import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './adminRouter.module.css'

const AdminRouter = () => {
    return (
        <div className={classes.wrapper}>
            <ul>
                <li><NavLink to={'/admin/my-editor'}>Редактор постов и туров</NavLink></li>
                <li><NavLink to={'/admin/tour-order'}>Мои заказы</NavLink></li>
                <li><NavLink to={'/admin/report'}>Отчет за период</NavLink></li>
            </ul>
        </div>
    )
}

export default AdminRouter;