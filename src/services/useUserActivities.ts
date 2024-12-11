import { useEffect, useState } from "react";
import { UserActivitiesType } from "./types";

export const useUserActivities = (): UserActivitiesType[] | null => {
  const [userActivity, setUserActivity] = useState<UserActivitiesType[] | null>(null);

  const getUserActivity = async (): Promise<void> => {
    try {
      const response = await fetch("/userActivity.json");
      const currentUserActivity = await response.json();

      if (!currentUserActivity) {
        console.log("No user activity found");
        setUserActivity(null);
      }

      setUserActivity(currentUserActivity);
    } catch (error) {
      console.error("Error while fetching user activity", error);
    }
  };

  useEffect(() => {
    getUserActivity();
  }, []);

  return userActivity;
};
