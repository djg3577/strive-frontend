import useActivityTotals from "@/hooks/useActivityTotals";

export function ActivityTotals() {
  const { activityTotals, convertMinutesToHoursAndMinutes } = useActivityTotals();

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
