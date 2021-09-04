import UserItem from "./UserItem/UserItem";
import styles from "./UserList.module.css";

const UserList = ({ users }) => {
  const usersEl = users.map(({ name, age, id }) => (
    <UserItem key={id} name={name} age={age} />
  ));
  return <div className={styles.list}>{usersEl}</div>;
};

export default UserList;
