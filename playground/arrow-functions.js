const user = {
    name: "Santiago",
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi, ${this.name}`);
    },
    sayHiAlt() {
        console.log("This is a method of the object");
        console.log("Regular Function");
        console.log(arguments);
        console.log(`Hi, ${this.name}`);
    }
};

console.log("Arraw Function do not bind THIS");
console.log("THIS on arraw functions refers to the parent binding");
console.log("here there isn't a parent function so THIS is going to refer to global");
user.sayHi();

user.sayHiAlt(1,2,3,4);