import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Error from "./pages/Error";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default Routing;
