import React from 'react'

import { useEffect} from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';


//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm';

const Explore = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () =>{
            const response = await fetch('/api/workouts')
            const json = await response.json()
    
    
            if(response.ok){
                dispatch({type:'SET_WORKOUTS', payload: json})
            }
        }
    
        fetchWorkouts()
    },[])

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Explore