import { useEffect, useState } from "react";
import { UserAverageSessionsType } from "./types";

export const useUserAverageSessions = (): UserAverageSessionsType[] | null => {
  const [userAverageSessions, setUserAverageSessions] = useState<UserAverageSessionsType[] | null>(
    null
  );

  const getUserMainData = async (): Promise<void> => {
    try {
      const response = await fetch("/userAverageSessions.json");
      const currentUserAverageSession = await response.json();

      if (!currentUserAverageSession) {
        setUserAverageSessions(null);
      }

      setUserAverageSessions(currentUserAverageSession);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserMainData();
  }, []);

  return userAverageSessions;
};
