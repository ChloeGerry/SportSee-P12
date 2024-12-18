import { useEffect, useState } from "react";
import { MOCKED_DATA_ENABLED } from "@/config";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { UserActivitiesType, UserAverageSessionsType, UserPerformancesType } from "./types";

export const useUserPerformances = (id: number): UserPerformancesType | null => {
  const [userPerformance, setUserPerformance] = useState<
    UserPerformancesType | UserActivitiesType | UserAverageSessionsType | null
  >(null);

  const getUserPerformances = async (id: number): Promise<void> => {
    try {
      const response = MOCKED_DATA_ENABLED
        ? await fetch("/userPerformance.json")
        : await fetch(`http://localhost:3000/user/${id}/performance`);

      const currentUserPerformances = await response.json();

      if (!currentUserPerformances) {
        console.log("No user performances found");
        setUserPerformance(null);
      }

      const formattedPerfomances = MOCKED_DATA_ENABLED
        ? getCurrentUser(currentUserPerformances)
        : null;

      MOCKED_DATA_ENABLED
        ? setUserPerformance(formattedPerfomances)
        : setUserPerformance(currentUserPerformances.data);
    } catch (error) {
      console.error("Error while fetching user performances", error);
    }
  };

  useEffect(() => {
    getUserPerformances(id);
  }, []);

  return userPerformance as UserPerformancesType;
};
