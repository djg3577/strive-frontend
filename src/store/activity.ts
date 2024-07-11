import { Activity } from "@/services/activity";
import activities from "@/services/activity";

async function createActivity(activity: Activity){
  return activities.createActivity(activity);
}

async function getActivityTotals(){
  return activities.getActivityTotals();
}

async function getActivityDates(){
  return activities.getActivityDates();
}

const ActivitiesStore = {
  createActivity,
  getActivityTotals,
  getActivityDates
}

export default ActivitiesStore;