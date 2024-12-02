import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useCallback, useEffect, useState } from "react";

function useActivityTotals() {
  const [activityTotals, setActivityTotals] = useState({});

  const fetchActivityTotals = async () => {
    const response = await ActivitiesStore.getActivityTotals();
    setActivityTotals(response.data.activity_totals);
  };
  const setup = useCallback(() => {
    fetchActivityTotals();
  }, [User.state.user]);

  const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  useEffect(() => {
    setup();
  }, [activityTotals]);

  return { convertMinutesToHoursAndMinutes, activityTotals };
}

export default useActivityTotals;
