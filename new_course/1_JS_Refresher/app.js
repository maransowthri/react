class Male {
  gender = "MALE";

  getGender = () => this.gender;
}

class Person extends Male {
  name = "Maran";

  greetings = () => `Hello ${this.name}`;
}

const person1 = new Person();
console.log(person1.greetings());
console.log(person1.getGender());
