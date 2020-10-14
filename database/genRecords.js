const faker = require('faker');

// This const determines the number of records generated
const RECORDS_QUANTITY = 10;

// Generates location data
const genLocations = () => {
  const locations = [];
  for (let i = 0; i < RECORDS_QUANTITY; i++) {
    const lowDays = [];
    const today = new Date();
    for (var j = 0; j < 40; j++) {
      lowDays.push(new Date(faker.date.future(0.5, today)))
    }
    const location = {
      id: i,
      rooms: Math.floor(Math.random() * 20) + 5,
      name: faker.name.lasName(),
      lowDays: lowDays
    };
    locations.push(location);
  }
  return locations;
};

// Generates trip data
const genTrips = () => {
  const trips = [];
  for (let i = 0; i < RECORDS_QUANTITY; i++) {
    const numberOfResevervations = Math.floor(Math.random() * 25);
    const adults = Math.ceil(Math.random() * 10);
    const checkIn = faker.date.soon(90);
    for (let j = 0; j < numberOfResevervations; j++) {
      let trip = {
        locationId: i,
        checkIn: checkIn,
        checkOut: faker.date.future(0.12, checkIn),
        adults: adults,
        children: Math.floor(Math.random() * 10),
        rooms: Math.ceil(Math.random() * adults),
      };
      trips.push(trip);
    }
  }
  return trips;
};

module.exports = { genLocations, genTrips };