const names = ["Karan", "Kalees", "Maran", "Mahesh"];

// const [a, b, ...c] = names;
// const [a, b, ...c] = names;
const [a, ...s, c] = names;
console.log(a, c);

const person = {
  name: "Maran",
  age: 23,
};

const { name } = person;
// console.log(name);
