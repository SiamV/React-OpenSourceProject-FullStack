import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import Tour from "./Tour";
import Preloader from "../common/Preloader/Preloader";
import classes from './tours.module.css'

const Tours = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])
    const tours = useSelector(state => state.tours.tours)
    const isLoading = useSelector(state => state.tours.isLoading)

    if (isLoading === false) {
        return <Preloader />
    }

    return (
        <div className={classes.toursPageWrapper}>
            {tours.filter(t => t.category === props.tourCategory).map(t => <Tour key={t._id}
                                                                                 id={t._id}
                                                                                 pageLink={t.pageLink}
                                                                                 tourTitle={t.tourTitle}
                                                                                 tourContent={t.tour}
            />)}
        </div>
    )
}

export default Tours;