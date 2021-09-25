import { useEffect, useState } from "react";

export const useCounter = (incrementor) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + incrementor);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [incrementor]);

  return counter;
};
