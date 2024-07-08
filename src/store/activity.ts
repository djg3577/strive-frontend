import { Activity } from "@/services/activity";
import activities from "@/services/activity";

async function createActivity(activity: Activity){
  return activities.createActivity(activity);
}

async function getActivityTotals(){
  return activities.getActivityTotals();
}

const ActivitiesStore = {
  createActivity,
  getActivityTotals
}

export default ActivitiesStore;