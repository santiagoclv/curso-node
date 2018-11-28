const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kitties', { useNewUrlParser: true });

let kittySchema = new mongoose.Schema({
    // type with validations.
    name: { type: String, required: true, minlength: 3, trim: true },
    age: { type: Date, default: Date.now },
    siblings: [{ name: String, relation: String }]
  });

kittySchema.methods.speak = function () {
    let greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
};
  
let Kitten = mongoose.model('Kitten', kittySchema);

// let fluffy = new Kitten({ name: 'fluffy', siblings: [ {name : 'Roberto', relation : 'bro'}] });
// fluffy.speak(); // "Meow name is fluffy"

// fluffy.save().then(() => console.log('meow'));

Kitten.find().then((kittens) => {
    console.log(kittens);
  }).catch(err => {
    if (err) return console.error(err);
  })