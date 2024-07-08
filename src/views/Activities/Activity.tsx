import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useState } from "react";

function CreateActivity() {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(0);
  const user = User.state.user.get();
  const userId = user?.id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ActivitiesStore.createActivity({
        user_id: userId,
        type: type,
        date: date,
        duration: duration,
      });
      setType("");
      setDate("");
      setDuration(0);
    } catch (error) {
      console.error("FAILED TO CREATE ACTITVIY", error);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Create Activity</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter type"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="Enter duration"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Activities() {
  return (
    <>
      <CreateActivity></CreateActivity>
    </>
  );
}


export default Activities;