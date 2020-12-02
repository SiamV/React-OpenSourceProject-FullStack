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
        <div className='container mx-auto flex h-auto'>
            {tours.map(t => <Tour tour={t} key={t._id} />)}
            Here will be Tour component
        </div>
    )
}

export default Tours;