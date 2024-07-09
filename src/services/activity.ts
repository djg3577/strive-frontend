import axios from "./axios";


export interface Activity {
  ID?: number;
  user_id: number;
  activity_name: string;
  duration: number;
  date: string;
}

export default {
  createActivity: async (activity: Activity) => {
    return axios.post("/activities", activity)
  },
  getActivityTotals: async () => {
    return axios.get("/activities")
  }

}
