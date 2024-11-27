import { colors } from "@/utils/constants";

type ScoreGraphType = {
  userScore?: number;
};

const ScoreGraph = ({ userScore }: ScoreGraphType) => {
  const width = 258;
  const height = 263;

  if (!userScore) return null;

  const score = userScore * 100;
  const circumference = 2 * Math.PI * 90;
  const filledLength = (score / 100) * circumference;
  const emptyLength = circumference - filledLength;

  return (
    <svg width={width} height={height} className="bg-light-grey rounded-small">
      <text x={32} y={40} style={{ fontSize: "15px", fontWeight: 500, color: "#20253A" }}>
        Score
      </text>
      <circle
        cx={width / 2}
        cy={height / 2}
        r={80}
        style={{ strokeWidth: 10, fill: "#ffff", stroke: "#ffff" }}
      />
      <circle
        cx={width / 2}
        cy={height / 2}
        r={90}
        style={{
          strokeWidth: 10,
          fill: "none",
          stroke: "#FF0000",
          strokeDasharray: `${filledLength} ${emptyLength}`,
          strokeDashoffset: circumference / 4,
          strokeLinecap: "round",
        }}
        transform={`rotate(-90 ${width / 2} ${height / 2})`}
      />
      <text
        x="50%"
        y="50%"
        style={{ fontSize: "26px", fontWeight: 700, fill: "#20253A", textAnchor: "middle" }}
      >
        {score}%
      </text>
      <text
        x="50%"
        y="60%"
        style={{ fontSize: "16px", fontWeight: 500, fill: colors.grey, textAnchor: "middle" }}
      >
        de votre
      </text>
      <text
        x="50%"
        y="70%"
        style={{ fontSize: "16px", fontWeight: 500, fill: colors.grey, textAnchor: "middle" }}
      >
        objectif
      </text>
    </svg>
  );
};

export default ScoreGraph;
