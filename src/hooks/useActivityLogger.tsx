import ActivitiesStore from "@/store/activity";
import User from "@/store/user";
import { useState } from "react";

export function useActivityLogger() {
  const [ActivityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hoursError, setHoursError] = useState("");
  const [minutesError, setMinutesError] = useState("");
  const user = User.state.user.get() as any;
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

  return {
    handleHoursChange,
    handleMinutesChange,
    handleSubmit,
    setActivityName,
    setDate,
    ActivityName,
    date,
    hours,
    minutes,
    hoursError,
    minutesError,
  };
}
