import { Route } from "react-router-dom";

import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";

export const privateRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      {/* <Route element={<AuthMiddlewares />}>

      </Route> */}
    </Route>
  </>
);
