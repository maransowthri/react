/** Reducer */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const sum = numbers.reduce(reducer);
// console.log(sum);

/** Slice */
// console.log(numbers.slice(3));
// console.log(numbers.slice(2, 6));

/** Splice */
// console.log();
// numbers.splice(2, 4, "replaced");
// console.log(numbers);

/** findIndex */
// const result = numbers.findIndex((number) => number > 5);
const result = numbers.find((number) => number > 5);
console.log(result);
