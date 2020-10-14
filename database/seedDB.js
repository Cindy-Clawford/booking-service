const mongoose = require('mongoose');
var db = require('./index.js');
var faker = require('faker');
var { dbUrl, user, pass } = require('./config.js');



mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: user,
  pass: pass
}, (err) => {
  mongoose.connection.dropDatabase()
});

var locations = [];
for (var i = 0; i < 100; i++ ) {
  let lowDays = [];
  var today = new Date();
  for (var j = 0; j < 40; j++) {
    lowDays.push(new Date(faker.date.future(0.5, today)))
  }
  location = {
    id: i,
    rooms: 10,
    name: `hotel${i}`,
    lowDays: lowDays
  };
  locations.push(db.createLocation(location));
}

var trips = []
for (var i = 0; i <= 100; i++ ) {
  var numberOfResevervations = Math.floor(Math.random() * 25);
  for (var j = 0; j < numberOfResevervations; j++) {
    var trip = {};
    trip.locationId = i;
    trip.checkIn = faker.date.soon(90);
    trip.checkOut = faker.date.future(0.12, trip.checkIn);
    trip.adults = Math.ceil(Math.random() * 10);
    trip.children = Math.floor(Math.random() * 10);
    trip.rooms = Math.ceil(Math.random() * trip.adults)
    trips.push(db.save(trip))
  }
}

Promise.all(locations)
  .then(Promise.all(trips))
  .then(result => {
    mongoose.connection.close();
  });

