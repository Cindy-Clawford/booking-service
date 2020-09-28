const mongoose = require('mongoose');
var db = require('./index.js');
var faker = require('faker');

var reservations = require('../../bookingSampleData/sampleReservations.js');

var dbUrl = 'mongodb://localhost/booking'
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  mongoose.connection.dropDatabase()
});

var locations = [];
for (var i = 0; i < 100; i++ ) {
  location = {
    id: i,
    rooms: 10,
    name: faker.lorem.words()
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

