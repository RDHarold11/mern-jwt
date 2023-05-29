import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner"
import { getGoals, reset } from "../features/goals/goalSlice";

import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if (!user) {
      navigate("/login");
    }
    if(user){
      dispatch(getGoals())
    }
    return () => {
      dispatch(reset())
    }
    
  }, [user, navigate, isError, message, dispatch]);

  if(isLoading) {
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goal Dashboard</p>
      </section>

      <GoalForm></GoalForm>

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}></GoalItem>
            ))}
          </div>
        ) : (<h3>No Goals</h3>)}
      </section>
    </>
  );
};

export default Dashboard;
