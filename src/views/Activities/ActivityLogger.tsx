import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useState } from "react";

export function ActivityLogger() {
  const [ActivityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hoursError, setHoursError] = useState("");
  const [minutesError, setMinutesError] = useState("");
  const user = User.state.user.get();
  const userId = user.id;

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (value === "" || (numValue >= 0 && numValue <= 17)) {
      setHours(value);
      setHoursError("");
    } else {
      setHoursError("Hours must be between 0 and 17");
    }
  };
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (value === "" || (numValue >= 0 && numValue <= 59)) {
      setMinutes(value);
      setMinutesError("");
    } else {
      setMinutesError("Minutes must be between 0 and 59");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hoursError || minutesError) {
      return; // Prevent submission if there are errors
    }
    const totalDurationInMinutes = (Number(hours) || 0) * 60 + (Number(minutes) || 0);
    try {
      await ActivitiesStore.createActivity({
        user_id: userId,
        activity_name: ActivityName,
        date: date,
        duration: totalDurationInMinutes,
      });
      setActivityName("");
      setDate("");
      setHours("");
      setMinutes("");
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
