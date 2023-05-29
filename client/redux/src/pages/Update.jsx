import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal } from "../features/goals/goalSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { goals } = useSelector((state) => state.goals);

  useEffect(() => {
    const goal = goals.find((goal) => goal._id === id);
    if (goal) {
      setText(goal.text);
    }
  }, [id, goals]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGoal({ id, text }));
    setText("");
    navigate("/");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            value={text}
            name="text"
            id="text"
            onChange={(e) => setText(e.target.value)}
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
