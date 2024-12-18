import { useEffect, useState } from "react";
import { MOCKED_DATA_ENABLED } from "@/config";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { UserActivitiesType, UserAverageSessionsType, UserPerformancesType } from "./types";

export const useUserAverageSessions = (id: number): UserAverageSessionsType | null => {
  const [userAverageSessions, setUserAverageSessions] = useState<
    UserAverageSessionsType | UserPerformancesType | UserActivitiesType | null
  >(null);

  const getUserAverageSessions = async (id: number): Promise<void> => {
    try {
      const response = MOCKED_DATA_ENABLED
        ? await fetch("/userAverageSessions.json")
        : await fetch(`http://localhost:3000/user/${id}/average-sessions`);
      const currentUserAverageSession = await response.json();

      if (!currentUserAverageSession) {
        console.log("No user average sessions found");
        setUserAverageSessions(null);
      }

      const formattedAverageSessions = MOCKED_DATA_ENABLED
        ? getCurrentUser(currentUserAverageSession)
        : null;

      MOCKED_DATA_ENABLED
        ? setUserAverageSessions(formattedAverageSessions)
        : setUserAverageSessions(currentUserAverageSession.data);
    } catch (error) {
      console.error("Error while fetching user average sessions", error);
    }
  };

  useEffect(() => {
    getUserAverageSessions(id);
  }, []);

  return userAverageSessions as UserAverageSessionsType;
};
