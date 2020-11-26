import React from 'react';
import classes from './Footer.module.css';
import WhatsApp from '../SocialBlocks/WhatsApp';
import Viber from '../SocialBlocks/Viber';
import Instagram from '../SocialBlocks/Instagram';
import Vkontakte from '../SocialBlocks/Vkontakte';

const Footer = () => {
    return (
        <div className={classes.wrapperFooter}>
            <WhatsApp />
            <Viber />
            <Instagram />
            <Vkontakte />
        </div>
    )
}

export default Footer;