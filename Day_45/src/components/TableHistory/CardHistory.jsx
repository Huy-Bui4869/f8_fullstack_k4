import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useSelector } from "react-redux";

import "./TableHistory.scss";

const CardHistory = forwardRef(function CardHistory(_, ref) {
  const cardRef = useRef();
  const history = useSelector((state) => state.checkResult.history);

  useImperativeHandle(ref, () => {
    return {
      next: () => {},
      pre: () => {},
    };
  });

  return (
    <div className="table-history_inner" ref={cardRef}>
      {history.map((cardItem, index) => {
        return (
          <div className="card-history" key={index}>
            <table>
              <thead>
                <tr>
                  <th>Số lần nhập</th>
                  <th>Số nhập vào</th>
                </tr>
              </thead>
              <tbody>
                {cardItem.map(({ number, isCheck }, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <span>{i + 1}</span>
                      </td>
                      <td>
                        <span
                          style={{
                            color: `${isCheck ? "#4fd1c5" : "#822727"}`,
                          }}
                        >
                          {number}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <caption>
                Lần chơi thứ {history.length - index} / {history.length}
              </caption>
              <caption>
                Số lần nhập tối đa:
                <span> {cardItem[0].maxTurn}</span>
              </caption>
              <caption className="ratio">Tỉ lệ đúng</caption>
            </table>
          </div>
        );
      })}
    </div>
  );
});

export default CardHistory;
