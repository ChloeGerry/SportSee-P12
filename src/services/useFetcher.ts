import { useEffect, useState } from "react";
import { BASE_URL, MOCKED_DATA_ENABLED } from "@/config";
import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  UserActivitiesType,
  UserAverageSessionsType,
  UserMainDataType,
  UserPerformancesType,
} from "./types";

export const useFetcher = (
  JSONfile: string,
  route: string,
  noDataMessage: string,
  id: number,
  isMainData: boolean,
  requestErrorMessage: string
):
  | UserActivitiesType
  | UserPerformancesType
  | UserAverageSessionsType
  | UserMainDataType
  | null => {
  const [data, setData] = useState<
    UserActivitiesType | UserPerformancesType | UserAverageSessionsType | null
  >(null);

  const getData = async (): Promise<void> => {
    try {
      const response = MOCKED_DATA_ENABLED
        ? await fetch(JSONfile)
        : await fetch(`${BASE_URL}/${route}`);
      const currentData = await response.json();

      if (!currentData) {
        console.log(noDataMessage);
        setData(null);
      }

      const updateMainData = MOCKED_DATA_ENABLED
        ? currentData.find((userData: UserMainDataType) => userData.id === id)
        : null;

      const updateOtherData = MOCKED_DATA_ENABLED ? getCurrentUser(currentData) : null;

      const formattedData = isMainData ? updateMainData : updateOtherData;

      MOCKED_DATA_ENABLED ? setData(formattedData) : setData(currentData.data);
    } catch (error) {
      console.error(requestErrorMessage, error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return data;
};
