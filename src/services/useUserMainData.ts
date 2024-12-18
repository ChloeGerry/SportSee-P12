import { useEffect, useState } from "react";
import { MOCKED_DATA_ENABLED } from "@/config";
import { UserMainDataType } from "./types";

export const useUserMainData = (id: number): UserMainDataType | null => {
  const [userMainData, setUserMainData] = useState<UserMainDataType | null>(null);

  const getUserMainData = async (id: number): Promise<void> => {
    try {
      const response = MOCKED_DATA_ENABLED
        ? await fetch("/userMainData.json")
        : await fetch(`http://localhost:3000/user/${id}`);
      const currentUserMainData = await response.json();

      const formattedMainData = MOCKED_DATA_ENABLED
        ? currentUserMainData.find((userData: UserMainDataType) => userData.id === id)
        : null;

      if (!currentUserMainData) {
        console.log("No user main data found");
        setUserMainData(null);
      }

      MOCKED_DATA_ENABLED
        ? setUserMainData(formattedMainData)
        : setUserMainData(currentUserMainData.data);
    } catch (error) {
      console.error("Error while fetching user main data", error);
    }
  };

  useEffect(() => {
    getUserMainData(id);
  }, []);

  return userMainData as UserMainDataType;
};
