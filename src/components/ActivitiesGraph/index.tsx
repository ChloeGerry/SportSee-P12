import * as d3 from "d3";
import { Fragment, useState } from "react";
import RadiusSvg from "@/components/RadiusSvg";
import { UserActivitiesType } from "@/services/types";
import { colors } from "@/utils/constants";

type ActivitiesGraphProps = {
  userActivities: UserActivitiesType;
};

const ActivitiesGraph = (userActivities: ActivitiesGraphProps) => {
  const [dailyActivity, setDailyActivity] = useState<{
    day: string;
    kilogram: number;
    calories: number;
    position: string;
  } | null>(null);

  const width = 865;
  const height = 320;
  const margin = { top: 20, right: 50, bottom: 48, left: 50 };
  const convertToString = d3.format("");

  if (!userActivities.userActivities) return null;

  const formattedActivities = userActivities.userActivities.sessions.map(
    ({ kilogram, calories }, index) => {
      const currentDay = index + 1;
      return {
        day: convertToString(currentDay),
        kilogram: kilogram,
        calories: calories,
      };
    }
  );

  const weights = formattedActivities.map((d) => d.kilogram);
  const maxWeight = Math.max(...weights);
  const minWeight = Math.min(...weights);

  const xScale = d3
    .scaleBand()
    .domain(formattedActivities.map(({ day }) => day))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...formattedActivities.map(({ calories }) => calories))])
    .nice()
    .range([height - margin.bottom, height - margin.bottom - 145]);

  const weightScale = d3
    .scaleLinear()
    .domain([minWeight - 1, maxWeight + 1])
    .range([height - margin.bottom, height - margin.bottom - 145]);

  const ticks = weightScale.domain();
  const weightMarks = [ticks[0], (ticks[0] + ticks[1]) / 2, ticks[1]];

  return (
    <svg width={width} height={height} className="rounded-small bg-light-grey">
      <text x={32} y={32} style={{ fontSize: "15px", fontWeight: "500", fill: colors.darkGrey }}>
        Activité quotidienne
      </text>

      <circle cx={width - 305} cy={32} r={4} style={{ fill: colors.darkGrey }} />
      <text x={width - 290} y={36} style={{ fontSize: "14px", fill: colors.grey }}>
        Poids (kg)
      </text>
      <circle cx={width - 187} cy={32} r={4} style={{ fill: colors.red }} />
      <text x={width - 174} y={36} style={{ fontSize: "14px", fill: colors.grey }}>
        Calories brûlées (kCal)
      </text>

      <g>
        {formattedActivities.map(({ day }) => (
          <text
            key={day}
            x={xScale(day)! + xScale.bandwidth() / 2}
            y={height - margin.bottom + 15}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              fill: colors.lightGrey,
            }}
          >
            {day}
          </text>
        ))}
      </g>

      {weightMarks.map((weight, index) => (
        <Fragment key={index}>
          <text
            x={width - margin.right + 3}
            y={weightScale(weight)}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              fill: colors.lightGrey,
            }}
          >
            {weight}
          </text>
          <line
            x1={margin.left}
            x2={width - margin.right}
            y1={weightScale(weight)}
            y2={weightScale(weight)}
            stroke="#DEDEDE"
            strokeDasharray={index === 0 ? "none" : "0 4 0"}
            strokeWidth={0.5}
          />
        </Fragment>
      ))}

      {dailyActivity && (
        <rect
          x={xScale(dailyActivity.day)}
          y={height - margin.bottom - 145}
          width={56}
          height={145}
          style={{ fill: "#C4C4C4", opacity: 0.5 }}
          transform={`translate(${xScale.bandwidth() / 2 - 24}, 0)`}
        />
      )}

      {formattedActivities.map(({ day, calories, kilogram }, index) => (
        <g key={day}>
          <path
            d={RadiusSvg({
              xScale,
              xValue: day,
              yScale,
              yValue: calories,
              height,
              width: 7,
              radius: 4,
              margin: margin.bottom,
            })}
            style={{ fill: colors.red, cursor: "pointer" }}
            transform={`translate(${(xScale.bandwidth() - 6) / 2 - 6}, 0)`}
            onMouseEnter={() =>
              setDailyActivity({
                day: day,
                kilogram: formattedActivities[index].kilogram,
                calories: calories,
                position: `translate(${150 + index * 107}, 60)`,
              })
            }
            onMouseLeave={() => setDailyActivity(null)}
          />

          <path
            d={RadiusSvg({
              xScale,
              xValue: day,
              yScale: weightScale,
              yValue: kilogram,
              height,
              width: 7,
              radius: 4,
              margin: margin.bottom,
            })}
            style={{ fill: colors.darkGrey, cursor: "pointer" }}
            transform={`translate(${(xScale.bandwidth() + 6) / 2 + 6}, 0)`}
            onMouseEnter={() =>
              setDailyActivity({
                day: day,
                kilogram: formattedActivities[index].kilogram,
                calories: calories,
                position: `translate(${150 + index * 107}, 60)`,
              })
            }
            onMouseLeave={() => setDailyActivity(null)}
          />
        </g>
      ))}

      {dailyActivity && (
        <g transform={dailyActivity?.position}>
          <rect x={0} y={0} width={40} height={63} fill={colors.red} />
          <text
            x={20}
            y={20}
            style={{ fontSize: "7px", fontWeight: "500", fill: "white", textAnchor: "middle" }}
          >
            {dailyActivity?.kilogram}kg
          </text>
          <text
            x={20}
            y={45}
            style={{ fontSize: "7px", fontWeight: "500", fill: "white", textAnchor: "middle" }}
          >
            {dailyActivity?.calories}kCal
          </text>
        </g>
      )}
    </svg>
  );
};

export default ActivitiesGraph;
