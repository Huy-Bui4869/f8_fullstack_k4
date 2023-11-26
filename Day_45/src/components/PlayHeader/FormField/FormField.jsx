import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./FormField.scss";

function FormField() {
  const [isCheck, setIsCheck] = useState(true);
  const valueRef = useRef();
  const data = useSelector((state) => state.checkResult.data);
  const random = useSelector((state) => state.reset.random);
  const maxTurn = useSelector((state) => state.reset.maxTurn);
  const numberRanger = useSelector((state) => state.reset.numberRanger);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = +valueRef.current.value;
    const check = data.some(({ number }) => number === result);
    if (check) {
      toast.warning("Bạn đã nhập số này rồi!");
      return;
    }

    dispatch({ type: "AĐD_DATA", payload: { number: result } });
    let text;
    console.log(`random_${random}`);

    if (result === random) {
      text = "Chúc mừng bạn đã trả lời đúng";
      toast.success(text);

      data[0]["maxTurn"] = maxTurn;
      data[data.length - 1]["isCheck"] = true;
      dispatch({ type: "TURN_NOT" });
      dispatch({
        type: "ADD_HISTORY_LOCALSTORAGE",
        payload: data,
      });
      setIsCheck(false);
    } else {
      if (data.length === maxTurn) {
        text = "Chúc bạn may mắn lần sau";
        setIsCheck(false);
      } else {
        text = `Hmm...Bạn cần ${result > random ? "giảm" : "tăng"} một chút.`;
      }
      toast.warning(text);
      dispatch({ type: "TURN_UPDATE" });
    }

    dispatch({
      type: "RENDER_TEXT",
      payload: text,
    });
  };

  //Remove inappropriate characters and limit the range
  const handleChange = (e) => {
    const value = e.target.value;
    const pattern = /^[0-9]*$/;

    if (!pattern.test(value) || value > +numberRanger) {
      e.target.value = value.slice(0, value.length - 1);
    }
  };

  // const handleKeyDown = (e) => {
  //   e.preventDefault();
  //   switch (e.key) {
  //     case "ArrowLeft": {
  //       console.log("pre");
  //     }

  //     case "ArrowRight": {
  //       console.log("next");
  //     }

  //     case "Enter": {
  //       onUpdate(NUMBER_RANGE);
  //       // setIsCheck(true);
  //     }

  //     default: {
  //       return;
  //     }
  //   }
  // };

  return (
    <>
      {/* {isCheck ? ( */}
      <form className="formField" onSubmit={handleSubmit}>
        <label htmlFor="keyNum">Hãy thử nhập một số</label>
        <input
          type="text"
          id="keyNum"
          placeholder="Thử một số..."
          onChange={handleChange}
          ref={valueRef}
        />
      </form>
      {/* ) : (
        <button
          className="playAgain"
          onClick={() => {
            setIsCheck(true);
            dispatch({
              type: "RESET_DATA",
            });
          }}
        >
          Chơi lại
        </button>
      )} */}
    </>
  );
}

export default FormField;

{
  /* <form className="formField" onSubmit={handleSubmit}>
  <label htmlFor="checkNum">Hãy thử nhập một số</label>
  <input
    type="text"
    id="checkNum"
    placeholder="Thử một số..."
    onChange={handleChange}
    ref={valueRef}
  />
</form>; */
}
