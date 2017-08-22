const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.info('connected');
});

const schema = mongoose.Schema({
  name: String,
});

schema.methods.speak = function () {
  const greeting = this.name ? `Meow name is ${this.name}` : 'I don\'t have a name';
  console.log(greeting);
};

const Kitten = mongoose.model('Kitten', schema);

const fluffy = new Kitten({ name: 'Fluffy' });

fluffy
  .save((err, fluffy) => {
    if (err) return console.error(err);
    return fluffy;
  })
  .then(() => {
    fluffy.speak();
    // Kitten.find({ name: /^fluff/i }, found => {
    //   console.info('found ', found.name, found.speak());
    // });
  });
