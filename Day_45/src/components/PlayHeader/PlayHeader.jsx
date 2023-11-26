import { useDispatch, useSelector } from "react-redux";
import "./PlayHeader.scss";
import LimitRange from "./LimitRange/LimitRange";
import FormField from "./FormField/FormField";

function PlayHeader() {
  const text = useSelector((state) => state.checkResult.text);
  const numberRanger = useSelector((state) => state.reset.numberRanger);
  const maxTurn = useSelector((state) => state.reset.maxTurn);
  const finalTurn = useSelector((state) => state.reset.finalTurn);
  const dispatch = useDispatch();
  console.log(`up_${numberRanger}`);

  return (
    <div className="headerGames">
      <div className="numberTurns">
        <div
          className="numberTurns_inner"
          style={{ width: `${(100 * finalTurn) / maxTurn}%` }}
        ></div>
      </div>
      <div className="subHeaderGame">
        <h2 className="desc heading">{text}</h2>
        <div className="desc quantity">
          Còn <span>{finalTurn}</span>/{maxTurn} lần
        </div>
        <div className="desc limit">
          Bạn cần tìm kiếm một số từ 1 đến
          {" " + localStorage.getItem("NUMBER_RANGE")}
        </div>
      </div>
      <LimitRange />
      <FormField />
    </div>
  );
}
export default PlayHeader;
