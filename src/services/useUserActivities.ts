import { useEffect, useState } from "react";
import { MOCKED_DATA_ENABLED } from "@/config";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { UserActivitiesType, UserAverageSessionsType, UserPerformancesType } from "./types";

export const useUserActivities = (id: number): UserActivitiesType | null => {
  const [userActivities, setUserActivities] = useState<
    UserActivitiesType | UserPerformancesType | UserAverageSessionsType | null
  >(null);

  const getuserActivities = async (id: number): Promise<void> => {
    try {
      const response = MOCKED_DATA_ENABLED
        ? await fetch("/userActivities.json")
        : await fetch(`http://localhost:3000/user/${id}/activity`);
      const currentuserActivities = await response.json();

      if (!currentuserActivities) {
        console.log("No user activity found");
        setUserActivities(null);
      }

      const formattedActivities = MOCKED_DATA_ENABLED
        ? getCurrentUser(currentuserActivities)
        : null;

      MOCKED_DATA_ENABLED
        ? setUserActivities(formattedActivities)
        : setUserActivities(currentuserActivities.data);
    } catch (error) {
      console.error("Error while fetching user activity", error);
    }
  };

  useEffect(() => {
    getuserActivities(id);
  }, []);

  return userActivities as UserActivitiesType;
};
