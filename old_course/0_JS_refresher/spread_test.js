/* Spread Operator */

const names = ["Karan", "Kalees", "Maran", "Mahesh"];
const newNames = [...names, "Kavinath"];
// console.log(newNames);

const person = { name: "Maran", age: 23 };
const newDetails = { ...person, gender: "Male" };
person.name = "Karan";
console.log(person);
console.log(newDetails);
// console.log(newDetails);

/* Rest Operator */
function sortNames(...args) {
  return args.sort();
}

// console.log(sortNames("Maran", "Abi", "Zayn"));
