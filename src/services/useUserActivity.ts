import { useEffect, useState } from "react";
import { UserActivityType } from "./types";

export const useUserActivity = (): UserActivityType[] | null => {
  const [userActivity, setUserActivity] = useState<UserActivityType[] | null>(null);

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
