import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <NavLink to={'/'}>It is Header</NavLink>
        </div>
    )
}

export default Header;