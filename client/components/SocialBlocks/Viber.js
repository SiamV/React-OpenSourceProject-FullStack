import React from 'react';
import ViberAppImg from '../../images/viber-v2.png';
import classes from './SocialBlocks.module.css'

const Viber = (props) => {
    return (
        <div className={classes.wrapperImgSocial}>
            <a href="https://msng.link/vi/5219983969285">
                <img src={ViberAppImg} alt='Viber' className={classes.imgSocial}/>
            </a>
        </div>
    )
}

export default Viber;