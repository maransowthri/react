const numbers = [0, 1, 2, 3, 4, 5, 6];

// To remove some items and to replace it with others (optional)
numbers.splice(2, 1, [8, 9]);
console.log(numbers);

// To get a sub array. Acts as a substring method
console.log(numbers.slice(2, 4));
