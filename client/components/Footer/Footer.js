import React from 'react';
import WhatsApp from '../SocialBlocks/WhatsApp'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.wrapperFooter}>
            <WhatsApp />
            <WhatsApp />
            <WhatsApp />
            <WhatsApp />
        </div>
    )
}

export default Footer;