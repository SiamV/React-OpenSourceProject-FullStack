import React from 'react';
import InstAppImg from '../../images/instagram-v2.png';
import classes from './SocialBlocks.module.css'

const Instagram = (props) => {
    return (
        <div className={classes.wrapperImgSocial}>
            <a href="https://www.instagram.com/mexicoline.ru"> 
                <img src={InstAppImg} alt='Instagram' className={classes.imgSocial}/>
            </a>
        </div>
    )
}

export default Instagram;