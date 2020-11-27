import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderImg from '../../images/logoAtom.png'
import classes from './Header.module.css'

const Header = () => {
    return (
        <div className={classes.headerWrapper}>
            <NavLink to={'/'}>
                <img src={HeaderImg} alt='Logo' className={classes.headerImg}/>
            </NavLink>
        </div>
    )
}

export default Header;