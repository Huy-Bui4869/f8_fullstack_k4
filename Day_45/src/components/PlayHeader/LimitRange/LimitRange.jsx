import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "./LimitRange.scss";

function LimitRange() {
  const valueInput = useRef();
  const valueShadow = useRef();
  const [miles, setMiles] = useState([]);
  const dispatch = useDispatch();

  //handle hover input range.
  const handleHoverInputRange = () => {
    const input = valueInput.current;
    const position = (input.clientWidth * input.value) / input.max;

    valueShadow.current.innerText = input.value;
    valueShadow.current.style.left = `${position}px`;
  };

  //refresh NUMBER_RANGE.
  const handleNumRange = () => {
    const numberRanger = valueInput.current.value;
    localStorage.setItem("NUMBER_RANGE", numberRanger);
    dispatch({ type: "RESET_DATA", payload: numberRanger });
  };

  useEffect(() => {
    const milestone = 4,
      newArr = [0];
    const num = valueInput.current.max / milestone;

    for (var i = 0; i < milestone; i++) {
      const currValue = newArr[newArr.length - 1] + num;
      newArr.push(currValue);
    }
    setMiles(newArr);

    handleHoverInputRange();
  }, []);

  return (
    <div className="limit-range">
      <input
        type="range"
        id="slider"
        min={5}
        max={2048}
        ref={valueInput}
        onChange={handleHoverInputRange}
        onMouseUp={handleNumRange}
        defaultValue={localStorage.getItem("NUMBER_RANGE")}
      />
      <span className="shadow" ref={valueShadow}></span>
      <div className="milestone">
        {miles.map((mile, i) => {
          if (i === 0) {
            mile += 100;
            return (
              <span
                key={i}
                style={{
                  transform: `translateX(${
                    (mile * valueInput.current.clientWidth) /
                    valueInput.current.max
                  }px)`,
                }}
              >
                {mile}
              </span>
            );
          }
          return <span key={i}>{mile}</span>;
        })}
      </div>
    </div>
  );
}

export default LimitRange;
