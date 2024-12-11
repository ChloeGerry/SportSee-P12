import * as d3 from "d3";
import { useState } from "react";
import { UserAverageSessionsType } from "@/services/types";
import { colors } from "@/utils/constants";

type AverageSessionsGraphProps = {
  userAverageSessions: UserAverageSessionsType;
};

const AverageSessionsGraph = (userAverageSessions: AverageSessionsGraphProps) => {
  const width = 258;
  const height = 263;
  const margin = { top: 20, right: 16, bottom: 40, left: 16 };

  const radius = 4;
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const [dailySessionLenght, setDailySessionLenght] = useState<{
    sessionLength: number;
    day: string;
  } | null>(null);

  const formattedAverageSessions = userAverageSessions.userAverageSessions.sessions.map(
    ({ day, sessionLength }) => ({
      day: days[day - 1],
      sessionLength: sessionLength,
      index: day.toString(),
    })
  );

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale: d3.ScalePoint<string> = d3
    .scalePoint()
    .domain(formattedAverageSessions.map(({ day, index }) => `${day}-${index}`))
    .range([0, innerWidth]);

  const yScale: d3.ScaleLinear<number, number> = d3
    .scaleLinear()
    .domain([0, d3.max(formattedAverageSessions, ({ sessionLength }) => sessionLength) ?? 0])
    .range([innerHeight, 0 + 100]);

  const lineGenerator = d3
    .line<{ day: string; sessionLength: number; index: string }>()
    .x(({ day, index }) => xScale(`${day}-${index}`) ?? 0)
    .y(({ sessionLength }) => yScale(sessionLength))
    .curve(d3.curveCatmullRom);

  const linePath = lineGenerator(formattedAverageSessions);

  return (
    <svg width={width} height={height} className="bg-red-icon rounded-small">
      <g transform={`translate(${margin.left}, 0)`}>
        {dailySessionLenght?.day && (
          <rect
            x={xScale(dailySessionLenght.day)}
            y={0}
            width={innerWidth}
            height={height}
            style={{ fill: colors.red }}
          />
        )}

        <path
          d={linePath ?? ""}
          style={{ fill: "none", stroke: "#fff", strokeWidth: 2, opacity: 0.5 }}
        />

        <text x={32} y={32} style={{ fontSize: "15px", fill: "#fff", opacity: 0.5 }}>
          Durée moyenne des
        </text>
        <text x={32} y={56} style={{ fontSize: "15px", fill: "#fff", opacity: 0.5 }}>
          sessions
        </text>

        {dailySessionLenght?.day && (
          <circle
            cx={xScale(dailySessionLenght.day)}
            cy={yScale(dailySessionLenght.sessionLength)}
            r={radius}
            fill="#fff"
            strokeOpacity={0.2}
            stroke="#fff"
            strokeWidth={8}
          />
        )}

        {dailySessionLenght?.day && (
          <>
            <rect
              x={(xScale(dailySessionLenght.day) ?? 0) - 20}
              y={(yScale(dailySessionLenght.sessionLength) ?? 0) - 30}
              width={40}
              height={20}
              style={{
                fill: "#fff",
              }}
            />
            <text
              x={xScale(dailySessionLenght.day) ?? 0}
              y={(yScale(dailySessionLenght.sessionLength) ?? 0) - 17}
              style={{
                fontSize: "8px",
                fontWeight: "500",
                fill: "#000",
                textAnchor: "middle",
              }}
            >
              {dailySessionLenght?.sessionLength} min
            </text>
          </>
        )}
      </g>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {formattedAverageSessions.map(({ sessionLength, day, index }) => (
          <text
            key={index}
            x={xScale(`${day}-${index}`)}
            y={innerHeight + 15}
            style={{
              fontSize: "12px",
              fill: "white",
              fontWeight: "500",
              textAnchor: "middle",
              opacity: 0.5,
              cursor: "pointer",
            }}
            onMouseEnter={() =>
              setDailySessionLenght({
                sessionLength,
                day: `${day}-${index}`,
              })
            }
            onMouseLeave={() => setDailySessionLenght(null)}
          >
            {day}
          </text>
        ))}
      </g>
    </svg>
  );
};

export default AverageSessionsGraph;
