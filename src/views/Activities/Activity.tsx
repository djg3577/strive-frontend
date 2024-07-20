import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useEffect, useState } from "react";
import "react-calendar-heatmap/dist/styles.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "./heatmap.css";
import Auth from "@/store/auth";
import { useNavigate } from "react-router-dom";

interface UserScore {
  username: string;
  score: number;
}
const Leaderboard = () => {
  const [scores, setScores] = useState<UserScore[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message: UserScore[] = JSON.parse(event.data);
      setScores(message.sort((a, b) => b.score - a.score)); // Sort in descending order
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };
    // !! INVESTIGATE WHT IT CLOSES IMMEDIATELY BUT IT STILL WORKS
    return () => {
      console.log("Cleaning up WebSocket connection");
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.username}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Heatmap = () => {
  const [activityDates, setActivityDates] = useState([]);
  useEffect(() => {
    const fetchActivityDates = async () => {
      const response = await ActivitiesStore.getActivityDates();
      setActivityDates(response.data.activity_dates);
    };
    fetchActivityDates();
  }, [User.state.user.get()]);
  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={activityDates}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          if (value.count > 5) {
            return "color-scale-6";
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value: { date: any; count: any }) => {
          return {
            "data-tip": value.date ? `${value.date}: ${value.count} activities` : "No activities",
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
  const userId = user.id;

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
  };
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

function ActivityTotals() {
  const [activityTotals, setActivityTotals] = useState({});

  useEffect(() => {
    console.log("THIS IS RUNNING")
    const fetchActivityTotals = async () => {
      const response = await ActivitiesStore.getActivityTotals();
      setActivityTotals(response.data.activity_totals);
    };
    fetchActivityTotals();
  }, [User.state.user.get()]);

  const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  };

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

function HandleGitHubLogin() {
  useEffect(() => {
    const fetchGitHubToken = async (code: string) => {
      try {
        await Auth.loginWithGitHub(code);
      } catch (error) {
        console.error(error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetchGitHubToken(code);
    }
  }, []);

  return <></>;
}

function LogOut() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Auth.logout();
    navigate("/home");
  };

  return (
    <button className="btn btn-primary" onClick={handleLogOut}>
      Log Out
    </button>
  );
}

function Activities() {
  return (
    <>
    <HandleGitHubLogin></HandleGitHubLogin>
      <CreateActivity></CreateActivity>
      <ActivityTotals></ActivityTotals>
      <Heatmap></Heatmap>
      <Leaderboard></Leaderboard>
      <LogOut></LogOut>
    </>
  );
}
// TODO: ADD A DROPDOWN THAT THE USER CAN CLICK FROM PAST ACTIVITIES SO THEY CAN ADD TIME TO PAST ACTIVITY INSTEAD OF CREATING A NEW ONE

export default Activities;
