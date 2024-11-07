export type UserMainDataType = {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
};

export type UserPerformancesType = {
  userId: number;
  kind: {
    1: "cardio";
    2: "energy";
    3: "endurance";
    4: "strength";
    5: "speed";
    6: "intensity";
  };
  data: {
    value: number;
    kind: number;
  };
};

export type UserActivitiesType = {
  userId: number;
  sessions: {
    day: string;
    kilogram: number;
    calories: number;
  };
};

export type UserAverageSessionsType = {
  userId: number;
  sessions: {
    day: number;
    sessionLength: number;
  };
};
