import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useEffect, useRef, useState } from "react";
import CalHeatmap from 'cal-heatmap';


// !! FIX THE HEATMAP HERE
const ActivityHeatmap = () => {
  const calendarRef = useRef(null);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await ActivitiesStore.getActivityTotals(); // Assuming this method exists
        const activityTotals = response.data.activity_totals
        const formattedData = Object.entries(activityTotals).map((activity: { date: any; duration: any; }) => ({
          date: activity.date,
          value: activity.duration
        }));
        setActivityData(formattedData);
      } catch (error) {
        console.error("Failed to fetch activity data", error);
      }
    };

    fetchActivityData();
  }, []);

  useEffect(() => {
    if (activityData.length > 0 && calendarRef.current) {
      const cal = new CalHeatmap();
      cal.paint({
        itemSelector: calendarRef.current,
        range: 12,
        domain: {
          type: 'month',
          gutter: 1,
          label: { text: 'MMM', textAlign: 'start', position: 'top' }
        },
        subDomain: { type: 'day', radius: 3 },
        data: {
          source: activityData,
          x: 'date',
          y: 'value'
        },
        date: {
          start: new Date(new Date().getFullYear(), 0, 1), // Start from January 1st of current year
        },
        scale: {
          color: {
            range: ['#ff0000', '#0000ff'], // Adjust color range as needed
            interpolate: 'prgn',
            type: 'linear',
            domain: [0, 100] // Adjust based on your duration range
          }
        },
        theme: 'light'
      });
    }
  }, [activityData]);

  return <div ref={calendarRef}></div>;
};


function CreateActivity() {
  const [ActivityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(0);
  const user = User.state.user.get();
  const userId = user?.id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ActivitiesStore.createActivity({
        user_id: userId,
        activity_name: ActivityName,
        date: date,
        duration: duration,
      });
      setActivityName("");
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
          <h1>Log Activity</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ActivityName">ActivityName</label>
              <input
                type="text"
                className="form-control"
                id="ActivityName"
                value={ActivityName}
                onChange={(e) => setActivityName(e.target.value)}
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
            Log
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ActivityTotals(){
  const [activityTotals, setActivityTotals] = useState({});

  useEffect(() => {
    const fetchActivityTotals = async () => {
      const response = await ActivitiesStore.getActivityTotals();
      setActivityTotals(response.data.activity_totals);
    }
    fetchActivityTotals();
  }, []);

  const convertMinutesToHoursAndMinutes = (totalMinutes:number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Activity Totals</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(activityTotals).map(([activity, totalMinutes]) => (
                <tr key={activity}>
                  <td>{activity}</td>
                  <td>{convertMinutesToHoursAndMinutes(totalMinutes as number)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// TODO: ADD A DROPDOWN THAT THE USER CAN CLICK FROM PAST ACTIVITIES SO THEY CAN ADD TIME TO PAST ACTIVITY INSTEAD OF CREATING A NEW ONE
function Activities() {
  return (
    <>
      <CreateActivity></CreateActivity>
      <ActivityTotals></ActivityTotals>
      <ActivityHeatmap></ActivityHeatmap>
    </>
  );
}


export default Activities;