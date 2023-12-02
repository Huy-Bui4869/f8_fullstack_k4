import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Board.scss";

import { getTasks } from "../../stores/middlewares/tasksMiddlewares";
import Header from "../../Layout/DefaultLayout/Header";
import ListColumn from "./ListColumn";
import Loading from "~/components/Loading";

function Board() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.task.status);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <>
      <Header />
      {status !== "idle" && status === "pending" ? <Loading /> : <ListColumn />}
    </>
  );
}

export default Board;
