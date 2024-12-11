import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MacroCard from "@/components/MacroCard";
import AverageSessionsGraph from "@/components/AverageSessionsGraph";
import ActivitiesGraph from "@/components/ActivitiesGraph";
import PerformancesGraph from "@/components/PerformancesGraph";
import ScoreGraph from "@/components/ScoreGraph";
import Error from "@/components/Error";
import { useUserMainData } from "@/services/useUserMainData";
import { useUserActivities } from "@/services/useUserActivities";
import { useUserAverageSessions } from "@/services/useUserAverageSessions";
import { useUserPerformances } from "@/services/useUserPerformances";
import { getUserMacro } from "@/data/userMacro";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { USER_ID } from "@/config";
import {
  UserActivitiesType,
  UserAverageSessionsType,
  UserMainDataType,
  UserPerformancesType,
} from "@/services/types";

const Dashboard = () => {
  const usersData = useUserMainData();
  const usersActivity = useUserActivities();
  const usersAverageSessions = useUserAverageSessions();
  const usersPerformances = useUserPerformances();

  const user: UserMainDataType | undefined = usersData?.find(
    (userData) => userData.id === Number(USER_ID)
  );

  const userAverageSessions =
    usersAverageSessions &&
    (getCurrentUser(usersAverageSessions) as UserAverageSessionsType | null);

  const userActivities =
    usersActivity && (getCurrentUser(usersActivity) as UserActivitiesType | null);

  const userPerformances =
    usersPerformances && (getCurrentUser(usersPerformances) as UserPerformancesType | null);

  const userMacro = getUserMacro(user);

  const userScore = user?.todayScore ?? user?.score;

  return (
    <>
      <Header />
      <div className="flex flex-row-reverse justify-end">
        <main className="sm:mt-8 sm:mb-4 sm:mx-4 xl:mt-16 xl:mr-24 xl:mb-20 xl:ml-28">
          {user && (
            <h1 className="font-medium text-5xl">
              Bonjour <span className="text-red">{user?.userInfos.firstName}</span>
            </h1>
          )}
          <p className="text-lg font-normal mt-10">
            Félicitations ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className="flex sm:flex-col min-[1440px]:flex-row mt-20 gap-8">
            <div className="flex flex-col gap-8">
              {userActivities ? <ActivitiesGraph userActivities={userActivities} /> : <Error />}
              <div className="flex gap-8 justify-center">
                {userAverageSessions ? (
                  <AverageSessionsGraph userAverageSessions={userAverageSessions} />
                ) : (
                  <Error />
                )}
                {userPerformances ? (
                  <PerformancesGraph userPerformances={userPerformances} />
                ) : (
                  <Error />
                )}
                {userScore ? <ScoreGraph userScore={userScore} /> : <Error />}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 min-[1440px]:flex min-[1440px]:flex-col gap-10">
              {userMacro ? (
                userMacro.map(({ icon, macroValue, macroName, iconBackground }) => {
                  return (
                    <MacroCard
                      key={macroName}
                      icon={icon}
                      macroValue={macroValue}
                      macroName={macroName}
                      iconBackground={iconBackground}
                    />
                  );
                })
              ) : (
                <Error />
              )}
            </div>
          </div>
        </main>
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
