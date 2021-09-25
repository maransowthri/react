import { useCounter } from "../hooks/useCounter";
import Card from "./Card";

const ForwardCounter = () => {
  const counter = useCounter(1);

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
