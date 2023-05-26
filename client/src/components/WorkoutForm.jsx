import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [form, setForm] = useState({
    title: "",
    load: "",
    reps: "",
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, load, reps } = form;
    const workout = { title, load, reps };
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setForm({
        title: "",
        load: "",
        reps: "",
      });
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        value={form.title}
        className={emptyFields.includes("title") ? "error" : ""}
        onChange={(e) => {
          setForm({
            ...form,
            title: e.target.value,
          });
        }}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={form.load}
        className={emptyFields.includes("load") ? "error" : ""}
        onChange={(e) => {
          setForm({
            ...form,
            load: e.target.value,
          });
        }}
      />
      <label>Reps:</label>
      <input
        type="number"
        value={form.reps}
        className={emptyFields.includes("reps") ? "error" : ""}
        onChange={(e) => {
          setForm({
            ...form,
            reps: e.target.value,
          });
        }}
      />
      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default WorkoutForm;
