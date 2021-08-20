import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserIDStateAsync } from "./atoms";
import { currentUserNameQuery } from "./selectors";

function NameSelector() {
  const [, setUserID] = useRecoilState(currentUserIDStateAsync);

  const onSelect = ({ target: { value } }) => {
    console.log(value);
    setUserID(value);
  };

  return (
    <select onChange={onSelect}>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  );
}

function Async() {
  const userName = useRecoilValue(currentUserNameQuery);
  return (
    <>
      <NameSelector />
      <div>Name: {userName}</div>
    </>
  );
}

export default Async;
