import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useEffect, useState } from "react";
import "react-calendar-heatmap/dist/styles.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "./heatmap.css";
import Auth from "@/store/auth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
          <tr className="text-center">
            <th className="pb-2 ">Username</th>
            <th className="pb-2 ">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 text-center">{score.username}</td>
              <td className="py-2">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
interface ActivityDate {
  date: string;
  count: number;
}
const Heatmap: React.FC = () => {
  const [activityDates, setActivityDates] = useState<ActivityDate[]>([]);

  useEffect(() => {
    const fetchActivityDates = async () => {
      try {
        const response = await ActivitiesStore.getActivityDates();
        setActivityDates(response.data.activity_dates);
      } catch (error) {
        console.error("Failed to fetch activity dates", error);
      }
    };
    fetchActivityDates();
  }, [User.state.user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 truncate">
      <h2 className="text-2xl font-bold text-red-600 mb-4 ">Activity Heatmap</h2>
      <div className="heatmap-container truncate">
        <CalendarHeatmap
          startDate={new Date("2024-01-01")}
          endDate={new Date("2024-12-31")}
          values={activityDates}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count > 5) return "color-scale-6";
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value: { date: any; count: number }) => {
            if (!value || !value.date) {
              return { "data-tooltip-id": "heatmap-tooltip", "data-tooltip-content": "No activities" };
            }
            return {
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `${value.date}: ${value.count} ${value.count === 1 ? "activity" : "activities"}`,
            };
          }}
          showWeekdayLabels={true}
        />
        <Tooltip id="heatmap-tooltip" />
      </div>
    </div>
  );
};

function CreateActivity() {
  const [ActivityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hoursError, setHoursError] = useState("");
  const [minutesError, setMinutesError] = useState("");
  const user = User.state.user.get();
  const userId = user.id;

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 17) {
      setHoursError("Hours cannot exceed 17");
      setHours(17);
    } else {
      setHoursError("");
      setHours(value);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 59) {
      setMinutesError("Minutes cannot exceed 59");
      setMinutes(59);
    } else {
      setMinutesError("");
      setMinutes(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hoursError || minutesError) {
      return; // Prevent submission if there are errors
    }
    const totalDurationInMinutes = hours * 60 + minutes;
    try {
      await ActivitiesStore.createActivity({
        user_id: userId,
        activity_name: ActivityName,
        date: date,
        duration: totalDurationInMinutes,
      });
      setActivityName("");
      setDate("");
      setHours(0);
      setMinutes(0);
      window.location.reload();
    } catch (error) {
      console.error("FAILED TO CREATE ACTIVITY", error);
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Duration</label>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="number"
                  className="w-full pl-3 pr-10 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  id="hours"
                  value={hours}
                  onChange={handleHoursChange}
                  min="0"
                  max="17"
                />
                <span className="absolute right-3 top-2 text-gray-400">hrs</span>
              </div>
              {hoursError && <p className="text-red-500 text-sm mt-1">{hoursError}</p>}
            </div>
            <div className="flex-1">
              <div className="relative">
                <input
                  type="number"
                  className="w-full pl-3 pr-10 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  id="minutes"
                  value={minutes}
                  onChange={handleMinutesChange}
                  min="0"
                  max="59"
                />
                <span className="absolute right-3 top-2 text-gray-400">min</span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 w-full transition duration-300 ease-in-out transform hover:scale-105"
          disabled={!!hoursError || !!minutesError}
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
            <th className="pb-2 text-center">Activity</th>
            <th className="pb-2 text-center">Total Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(activityTotals).map(([activity, totalMinutes]) => (
            <tr key={activity} className="border-t">
              <td className="py-2 pr-2">{activity}</td>
              <td className="py-2 truncate">{convertMinutesToHoursAndMinutes(totalMinutes as number)}</td>
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
