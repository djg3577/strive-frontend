import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useEffect, useState } from "react";
import 'react-calendar-heatmap/dist/styles.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import './heatmap.css';

const Heatmap = () => {
  const [activityDates, setActivityDates] = useState([]);
  useEffect(() => {
    const fetchActivityDates = async () => {
      const response = await ActivitiesStore.getActivityDates();
      setActivityDates(response.data.activity_dates);
    }
    fetchActivityDates();
  }, []);
  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={new Date('2024-01-01')}
        endDate={new Date('2024-12-31')}
        values={activityDates}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count > 5) {
            return 'color-scale-6';
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value: { date: any; count: any; }) => {
          return {
            'data-tip': value.date
              ? `${value.date}: ${value.count} activities`
              : 'No activities',
          };
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
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
      <Heatmap ></Heatmap>
    </>
  );
}


export default Activities;