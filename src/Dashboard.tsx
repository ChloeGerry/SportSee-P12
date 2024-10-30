import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import MacroCard from "./components/MacroCard";
import { useUserMainData } from "./services/useUserMainData";
import { useUserActivity } from "./services/useUserActivity";
import { useUserAverageSessions } from "./services/useUserAverageSessions";
import { useUserPerformance } from "./services/useUserPerformance";
import { UserMainDataType } from "./services/types";
import { getUserMacro } from "./data/userMacro";

const Dashboard = () => {
  const userId = import.meta.env.VITE_USER_ID;
  const userParamId = useParams();
  const usersData = useUserMainData();
  const navigate = useNavigate();
  const usersActivity = useUserActivity();
  const usersAverageSessions = useUserAverageSessions();
  const usersPerformances = useUserPerformance();

  const user: UserMainDataType | undefined = usersData?.find(
    (userData) => userData.id === Number(userId)
  );

  useEffect(() => {
    if (userId !== userParamId.id) {
      navigate("/*");
    }
  }, [userId, userParamId.id]);

  const userMacro = getUserMacro(user);

  return (
    <>
      <Header />
      <div className="flex flex-row-reverse justify-end">
        <main className="mt-16 mr-24 mb-20 ml-28">
          {user && (
            <h1 className="font-medium text-5xl">
              Bonjour <span className="text-red">{user?.userInfos.firstName}</span>
            </h1>
          )}
          <p className="text-lg font-normal mt-10">
            Félicitations ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className="flex flex-col gap-10">
            {userMacro.map(({ icon, macroValue, macroName, iconBackground }) => {
              return (
                <MacroCard
                  key={macroName}
                  icon={icon}
                  macroValue={macroValue}
                  macroName={macroName}
                  iconBackground={iconBackground}
                />
              );
            })}
          </div>
        </main>
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
