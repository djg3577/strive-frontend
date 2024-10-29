import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useState, useEffect, useCallback } from "react";
interface ActivityDate {
  date: string;
  count: number;
}
function useHeatmap() {
  const [activityDates, setActivityDates] = useState<ActivityDate[]>([]);

  const fetchActivityDates = async () => {
    try {
      const response = await ActivitiesStore.getActivityDates();
      setActivityDates(response.data.activity_dates);
    } catch (error) {
      console.error("Failed to fetch activity dates", error);
    }
  };

  const setup = useCallback(() => {
    fetchActivityDates();
  }, [User.state.user]);

  useEffect(() => {
    setup();
  }, []);

  return activityDates;
}

export default useHeatmap;
