import styles from "./UserItem.module.css";

const UserItem = ({ name, age }) => {
  return (
    <div className={styles.item}>
      <p>
        {name} ({age} years old)
      </p>
    </div>
  );
};

export default UserItem;
