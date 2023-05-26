import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();

  //fire only the first time the component renders
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts/");
      //json is the array of data received from the DB
      const json = await response.json();
      // console.log(response.json());
      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    };
    fetchWorkouts();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}
      </div>
      <WorkoutForm />
    </div>
  );
};
export default Home;
