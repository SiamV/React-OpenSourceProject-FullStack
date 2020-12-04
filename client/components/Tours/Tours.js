import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import Tour from "./Tour";

const Tours = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])
    const tours = useSelector(state => state.tours.tours)

    return (
        <div>
            {tours.map(t => <Tour key={t._id} tour={t.tour} id={t._id}/>)}
        </div>
    )
}

export default Tours;