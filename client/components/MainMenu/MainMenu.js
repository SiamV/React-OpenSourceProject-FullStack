import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MainMenu.module.css';

const MainMenu = () => {
    return (
            <nav className={classes.wrapperNav}>
                <NavLink to={'/articles'} className={classes.MenuButton}>Articles</NavLink>
                <NavLink to={'/tours'} className={classes.MenuButton}>Tours</NavLink>
            </nav>
    )
}

export default MainMenu;