import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useState, useEffect } from "react";

export function ActivityTotals() {
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
