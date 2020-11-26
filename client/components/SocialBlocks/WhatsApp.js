import React from 'react';
import WhatsAppImg from '../../images/whatsapp-v2.png';
import classes from './SocialBlocks.module.css'

const WhatsApp = (props) => {
    return (
        <div className={classes.wrapperImgSocial}>
            <a href="https://api.whatsapp.com/send?phone=5219983886735"> 
                <img src={WhatsAppImg} alt='WhatsApp' className={classes.imgSocial}/>
            </a>
        </div>
    )
}

export default WhatsApp;