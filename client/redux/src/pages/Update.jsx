import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal } from "../features/goals/goalSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Update = () => {
  const [text, setText] = useState("");
  const [singleGoal, setSingleGoal] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const { goals } = useSelector((state) => state.goals);

  useEffect(() => {
    const goal = goals.find((goal) => goal._id == id);
    setSingleGoal(goal);
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGoal({ id, singleGoal }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            value={singleGoal?.text}
            name="text"
            id="text"
            onChange={(e) => setSingleGoal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Update
          </button>
        </div>
      </form>
    </section>
  );
};
export default Update;
