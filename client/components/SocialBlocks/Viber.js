import React from 'react';
import WhatsAppImg from '../../images/viber-v2.png';
import classes from './SocialBlocks.module.css'

const Viber = (props) => {
    return (
        <div className={classes.wrapperImgSocial}>
            <a href="https://msng.link/vi/5219983886735"> 
                <img src={WhatsAppImg} alt='Viber' className={classes.imgSocial}/>
            </a>
        </div>
    )
}

export default Viber;