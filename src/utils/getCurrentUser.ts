import { USER_ID } from "@/config";
import {
  UserPerformancesType,
  UserActivitiesType,
  UserAverageSessionsType,
} from "@/services/types";

export const getCurrentUser = (
  users: UserPerformancesType[] | UserActivitiesType[] | UserAverageSessionsType[]
) => {
  return users.find((currentUser) => currentUser.userId === Number(USER_ID));
};
