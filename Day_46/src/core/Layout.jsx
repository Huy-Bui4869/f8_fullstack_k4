import { Routes } from "react-router-dom";
import { publicRoutes } from "../routes/publicRoutes";
import { privateRoutes } from "../routes/privateRoutes";

function Layout() {
  return (
    <Routes>
      {publicRoutes}
      {privateRoutes}
    </Routes>
  );
}

export default Layout;
