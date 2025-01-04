import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MacroCard from "@/components/MacroCard";
import AverageSessionsGraph from "@/components/AverageSessionsGraph";
import ActivitiesGraph from "@/components/ActivitiesGraph";
import PerformancesGraph from "@/components/PerformancesGraph";
import ScoreGraph from "@/components/ScoreGraph";
import Error from "@/components/Error";
import { useFetcher } from "@/services/useFetcher";
import { getUserMacro } from "@/data/userMacro";
import { USER_ID } from "@/config";
import {
  UserActivitiesType,
  UserAverageSessionsType,
  UserMainDataType,
  UserPerformancesType,
} from "@/services/types";

const Dashboard = () => {
  const userData = useFetcher(
    "/userMainData.json",
    `user/${Number(USER_ID)}`,
    "No user main data found",
    Number(USER_ID),
    true,
    "Error while fetching user main data"
  ) as UserMainDataType;

  const userActivities = useFetcher(
    "/userActivities.json",
    `user/${Number(USER_ID)}/activity`,
    "No user activity found",
    Number(USER_ID),
    false,
    "Error while fetching user activity"
  ) as UserActivitiesType;

  const userAverageSessions = useFetcher(
    "/userAverageSessions.json",
    `user/${Number(USER_ID)}/average-sessions`,
    "No user average sessions found",
    Number(USER_ID),
    false,
    "Error while fetching user average sessions"
  ) as UserAverageSessionsType;

  const userPerformances = useFetcher(
    "/userPerformance.json",
    `user/${Number(USER_ID)}/performance`,
    "No user performance found",
    Number(USER_ID),
    false,
    "Error while fetching user performance"
  ) as UserPerformancesType;

  if (!userData) return <Error />;

  const userMacro = getUserMacro(userData);

  const userScore = userData.todayScore ?? userData.score;

  return (
    <>
      <Header />
      <div className="flex flex-row-reverse justify-end">
        <main className="sm:mt-8 sm:mb-4 sm:mx-4 xl:mt-16 xl:mr-24 xl:mb-20 xl:ml-28">
          {userData && (
            <h1 className="font-medium text-5xl">
              Bonjour <span className="text-red">{userData.userInfos.firstName}</span>
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
