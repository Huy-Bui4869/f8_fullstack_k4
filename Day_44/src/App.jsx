import { Fragment } from "react";
import Login from "./components/Login/Login";
import Profiles from "./components/Profiles/Profiles";
import Loading from "./components/Loading/Loading";
import { useStateCustom } from "./core/hook";

function App() {
  const loading = useStateCustom((state) => state.loading);
  return (
    <Fragment>
      <Profiles />
      <Login />
      {loading && <Loading />}
    </Fragment>
  );
}

export default App;
