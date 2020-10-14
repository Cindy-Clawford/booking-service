const mongoose = require('mongoose');
var { dbUrl, user, pass } = require('./config.js')

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: user,
  pass: pass
});

let tripSchema = mongoose.Schema({
  locationId: {type: Number, required: true},
  checkIn: {type: Date, required: true},
  checkOut: {type: Date, required: true},
  adults: Number,
  children: Number,
  rooms: {type: Number, required: true}
});

let locationSchema = mongoose.Schema({
  locationId: {type: Number, required: true},
  rooms: {type: Number, required: true},
  name: String,
  lowDays: [{}]
});



let Trip = mongoose.model('Trip', tripSchema);
let Location = mongoose.model('Location', locationSchema);

var save = (trip) => {
  return new Promise((resolve, reject) => {
    Trip.create(trip, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

var getReservationsForLocation = (locationId) => {
  return new Promise((resolve, reject) => {
    Trip.find({
      locationId: locationId
    }).exec((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

var createLocation = (location) => {
  return new Promise((resolve, reject) => {
    Location.create({
      locationId: location.id,
      rooms: location.rooms,
      name: location.name,
      lowDays: location.lowDays
    }, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

var getLocationInformation = (locationId) => {
  return new Promise((resolve, reject) => {
    Location.find({
      name: locationId
    }).exec((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}



module.exports.save = save;
module.exports.getReservationsForLocation = getReservationsForLocation;
module.exports.createLocation = createLocation;
module.exports.getLocationInformation = getLocationInformation;