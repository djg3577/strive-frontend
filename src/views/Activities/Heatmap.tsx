import "react-calendar-heatmap/dist/styles.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "./heatmap.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useHeatmap from "@/hooks/useHeatmap";

export const Heatmap: React.FC = () => {
  const activityDates = useHeatmap();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 truncate">
      <h2 className="text-2xl font-bold text-red-600 mb-4 ">Activity Heatmap</h2>
      <div className="heatmap-container truncate">
        <CalendarHeatmap
          startDate={new Date("2024-01-01")}
          endDate={new Date("2024-12-31")}
          values={activityDates}
          classForValue={(value) => {
            if (!value) return "color-empty";
            if (value.count > 5) return "color-scale-6";
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value: { date: any; count: number }) => {
            if (!value || !value.date) {
              return { "data-tooltip-id": "heatmap-tooltip", "data-tooltip-content": "No activities" };
            }
            return {
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `${value.date}: ${value.count} ${value.count === 1 ? "activity" : "activities"}`,
            };
          }}
          showWeekdayLabels={true}
        />
        <Tooltip id="heatmap-tooltip" />
      </div>
    </div>
  );
};
