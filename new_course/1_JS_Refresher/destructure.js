const person = {
  fullName: "Maran Sowthri Kalailingam",
  age: 21,
};

const { fullName } = person;

const [height, weight] = ["175cm", "230lbs"];

console.log(fullName);
console.log(height);

const numbers = [1, 2, 3, 4, 5];
const [num1, num2, ...numList] = numbers;
console.log(num1, num2, numList);
