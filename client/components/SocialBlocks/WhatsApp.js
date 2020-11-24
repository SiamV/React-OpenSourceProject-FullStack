import React from 'react';
import WhatsAppImg from '../../images/whatsapp.png';
import { NavLink } from 'react-router-dom';

const WhatsApp = (props) => {
    return (
        <div className="">
            <a href="http://whatsapp.ru"> <img src={WhatsAppImg} alt='WhatsApp' width="50" height="50"/></a>
        </div>
    )
}

export default WhatsApp;