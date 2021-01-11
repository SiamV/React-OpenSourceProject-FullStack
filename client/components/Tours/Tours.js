import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import Tour from "./Tour";
import Preloader from "../common/Preloader/Preloader";

const Tours = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])
    const tours = useSelector(state => state.tours.tours)
    const isLoading = useSelector(state => state.tours.isLoading)
    
    if(isLoading === false){
        return <Preloader />
    }

    return (
        <div>
            {tours.map(t => <Tour key={t._id}
                                  tourTitle={t.tourTitle}
                                  id={t._id}
                                  tourText={t.tour}
            />)}
        </div>
    )
}

export default Tours;