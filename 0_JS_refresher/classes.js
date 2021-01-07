class Human {
  name = name;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  generalBio() {
    return `${this.name} is ${this.age} years old.`;
  }
}

class Male extends Human {
  gender = "Male";

  getGenderInfo = () => {
    return `${this.name} is ${this.gender}`;
  };
}

const andrew = new Male("Andrew", 23, "Male");
// console.log(andrew);
// console.log(andrew.generalBio());
console.log(andrew.getGenderInfo());
