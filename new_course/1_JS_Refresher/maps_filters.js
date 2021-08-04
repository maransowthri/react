const numbers = [1, 2, 3, 4, 5, 6];

const added2s = numbers.map((number) => number + 2);
console.log(added2s);

const evens = numbers.filter((number) => number % 2 === 0);
console.log(evens);

const sum = numbers.reduce((prev, next) => {
  prev += next;
  return prev;
}, 0);
console.log(sum);
