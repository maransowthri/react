const arr = [1, 2, 3];
const newArr = [...arr, 6];
console.log(newArr);

const obj = {
  name: "Maran",
  age: 22,
};

const newObj = { ...obj, gender: "Male" };
console.log(newObj);
