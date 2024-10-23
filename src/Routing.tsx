import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Error from "./pages/Error";
import { useUserMainData } from "./services/useUserMainData";

const Routing = () => {
  const userId = import.meta.env.VITE_USER_ID;
  const usersData = useUserMainData();
  const user = usersData?.find((userData) => userData.id === Number(userId));

  return (
    <Routes>
      {user?.id && <Route path="/" element={<Navigate to={`/user/${user?.id}`} replace />} />}
      <Route path="/user/:id" element={<Dashboard />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default Routing;
