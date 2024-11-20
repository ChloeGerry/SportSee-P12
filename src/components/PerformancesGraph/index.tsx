import * as d3 from "d3";
import { UserPerformancesType } from "@/services/types";
import { colors } from "@/utils/constants";

const labels: { [key: number]: string } = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

type PerformancesGraphProps = {
  userPerformances: UserPerformancesType | null;
};

const PerformancesGraph = (userPerformances: PerformancesGraphProps) => {
  const width = 258;
  const height = 263;
  const smallestPolygonSize = 18;
  const radius = smallestPolygonSize * 5;
  const centerX = width / 2;
  const centerY = height / 2;
  const numberOfSides = 6;

  if (!userPerformances.userPerformances) return null;

  const userKind = userPerformances.userPerformances.kind;

  if (!userKind) return null;

  const reverseFormattedPerformances = userPerformances.userPerformances.data.map(
    ({ value, kind }) => ({
      value: value,
      label: labels[kind],
      index: kind,
    })
  );

  const formattedPerformances = reverseFormattedPerformances.reverse();

  const angleSlice: number = (2 * Math.PI) / formattedPerformances.length;
  const bestPerformance: number = d3.max(formattedPerformances, ({ value }) => value) || 1;

  const radiusScale: d3.ScaleLinear<number, number> = d3
    .scaleLinear()
    .range([0, radius])
    .domain([0, bestPerformance]);

  const radarLine: d3.LineRadial<{ label: string; value: number }> = d3
    .lineRadial<{ label: string; value: number }>()
    .radius(({ value }) => radiusScale(value))
    .angle((_, index) => index * angleSlice);

  const path = radarLine(formattedPerformances);

  const createPolygonPoints = (polygonLevel: number) => {
    const levelRadius = smallestPolygonSize * polygonLevel;
    return Array.from({ length: numberOfSides }, (_, index) => {
      const angle = index * angleSlice - Math.PI / 2;
      const x = centerX + levelRadius * Math.cos(angle);
      const y = centerY + levelRadius * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <svg width={width} height={height} className="bg-dark-grey rounded-small">
      {[...Array(5).keys()].map((index) => {
        const polygonLevel = index + 1;
        return (
          <polygon
            key={index}
            points={createPolygonPoints(polygonLevel)}
            style={{ fill: "none", stroke: "white", strokeWidth: 0.5 }}
          />
        );
      })}

      <path
        d={path || ""}
        style={{
          opacity: "0.8",
          fill: colors.red,
          stroke: colors.red,
          strokeWidth: 0,
        }}
        transform={`translate(${centerX}, ${centerY})`}
      />

      {formattedPerformances.map(({ label, index }) => {
        const angle = index * angleSlice - Math.PI / 2;
        const xPostion = centerX + (radius + 30) * Math.cos(angle);
        const yPosition = centerY + (radius + 15) * Math.sin(angle);

        return (
          <text
            key={index}
            x={xPostion}
            y={yPosition}
            style={{ fontSize: "12px", fontWeight: "500", fill: "white", textAnchor: "middle" }}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

export default PerformancesGraph;
