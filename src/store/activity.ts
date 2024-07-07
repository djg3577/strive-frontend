import { Activity } from "@/services/activity";
import activities from "@/services/activity";

async function createActivity(activity: Activity){
  return activities.createActivity(activity);
}

const ActivitiesStore = {
  createActivity
}

export default ActivitiesStore;