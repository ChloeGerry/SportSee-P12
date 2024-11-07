import { useEffect, useState } from "react";
import { UserActivitiesType } from "./types";

export const useUserActivity = (): UserActivitiesType[] | null => {
  const [userActivity, setUserActivity] = useState<UserActivitiesType[] | null>(null);

  const getUserActivity = async (): Promise<void> => {
    try {
      const response = await fetch("/userActivity.json");
      const currentUserActivity = await response.json();

      if (!currentUserActivity) {
        setUserActivity(null);
      }

      setUserActivity(currentUserActivity);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserActivity();
  }, []);

  return userActivity;
};
