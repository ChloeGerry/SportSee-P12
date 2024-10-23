import { useEffect, useState } from "react";
import { UserMainDataType } from "./types";

export const useUserMainData = (): UserMainDataType[] | null => {
  const [userMainData, setUserMainData] = useState<UserMainDataType[] | null>(null);

  const getUserMainData = async (): Promise<void> => {
    try {
      const response = await fetch("/userMainData.json");
      const currentUserMainData = await response.json();

      if (!currentUserMainData) {
        setUserMainData(null);
      }

      setUserMainData(currentUserMainData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserMainData();
  }, []);

  return userMainData;
};
