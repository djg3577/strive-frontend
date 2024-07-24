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
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Username</th>
            <th className="pb-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{score.username}</td>
              <td className="py-2">{score.score}</td>
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
  }, [User.state.user]);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Activity Heatmap</h2>
      <div className="heatmap-container ">
        <CalendarHeatmap
          startDate={new Date("2024-01-01")}
          endDate={new Date("2024-12-31")}
          values={activityDates}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count > 5) return "color-scale-6";
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value: { date: any; count: any }) => ({
            "data-tip": value.date ? `${value.date}: ${value.count} activities` : "No activities",
          })}
          showWeekdayLabels={true}
        />
      </div>
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Log Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ActivityName" className="block text-gray-700 font-bold mb-2">
            Activity Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            id="ActivityName"
            value={ActivityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="Enter activity type"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Enter duration"
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 w-full"
        >
          Log Activity
        </button>
      </form>
    </div>
  );
}

function ActivityTotals() {
  const [activityTotals, setActivityTotals] = useState({});

  useEffect(() => {
    const fetchActivityTotals = async () => {
      const response = await ActivitiesStore.getActivityTotals();
      setActivityTotals(response.data.activity_totals);
    };
    fetchActivityTotals();
  }, [User.state.user]);

  const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Activity Totals</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Activity</th>
            <th className="pb-2">Total Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(activityTotals).map(([activity, totalMinutes]) => (
            <tr key={activity} className="border-t">
              <td className="py-2">{activity}</td>
              <td className="py-2">{convertMinutesToHoursAndMinutes(totalMinutes as number)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

function Activities() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <HandleGitHubLogin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">Your Activities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CreateActivity />
          <ActivityTotals />
        </div>
        <Heatmap />
        <Leaderboard />
        <div className="text-center mt-8"></div>
      </div>
    </div>
  );
}
// TODO: ADD A DROPDOWN THAT THE USER CAN CLICK FROM PAST ACTIVITIES SO THEY CAN ADD TIME TO PAST ACTIVITY INSTEAD OF CREATING A NEW ONE

export default Activities;
