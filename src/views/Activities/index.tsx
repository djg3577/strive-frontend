import "react-calendar-heatmap/dist/styles.css";
import "./heatmap.css";
import "react-tooltip/dist/react-tooltip.css";
import { HandleGitHubLogin } from "../Auth/HandleGithubLogin";
import { ActivityTotals } from "./ActivityTotals";
import { Heatmap } from "./Heatmap";
import { Leaderboard } from "./Leaderboard";
import { ActivityLogger } from "./ActivityLogger";

function Activities() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <HandleGitHubLogin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">Your Activities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActivityLogger />
          <ActivityTotals />
        </div>
        <Heatmap />
        <Leaderboard />
        <div className="text-center mt-8"></div>
      </div>
    </div>
  );
}
// TODO: ADD A DROPDOWN THAT THE USER CAN CLICK FROM PAST ACTIVITIES SO THEY CAN ADD TIME TO PAST ACTIVITY INSTEAD OF CREATING A NEW ONE

export default Activities;
