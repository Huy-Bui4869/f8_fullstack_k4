import { useEffect, useState } from "react";
import AuthLayout from "~/Layout/AuthLayout/AuthLayout";
import Board from "~/pages/Board/Board";
function App() {
  const [isCheck, setIsCheck] = useState(false);

  const handleSub = (value) => {
    setIsCheck(value);
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const apiKey = localStorage.getItem("apiKey");

    if (email && apiKey) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  });

  return <>{isCheck ? <Board /> : <AuthLayout onSub={handleSub} />}</>;
}

export default App;
