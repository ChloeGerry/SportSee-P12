import { useEffect, useState } from "react";
import { UserPerformancesType } from "./types";

export const useUserPerformances = (): UserPerformancesType[] | null => {
  const [userPerformance, setUserPerformance] = useState<UserPerformancesType[] | null>(null);

  const getUserMainData = async (): Promise<void> => {
    try {
      const response = await fetch("/userPerformance.json");
      const currentUserPerformance = await response.json();

      if (!currentUserPerformance) {
        setUserPerformance(null);
      }

      setUserPerformance(currentUserPerformance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserMainData();
  }, []);

  return userPerformance;
};
