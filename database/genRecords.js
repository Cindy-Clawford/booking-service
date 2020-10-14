const faker = require('faker');

// Generates location data
const genLocations = (blockSize) => {
  console.log(`Generating ${blockSize} locations`);
  const locations = [];
  for (let i = 0; i < blockSize; i++) {
    const lowDays = [];
    const today = new Date();
    for (var j = 0; j < 40; j++) {
      lowDays.push(new Date(faker.date.future(0.5, today)))
    }
    const location = {
      id: i,
      rooms: Math.floor(Math.random() * 20) + 5,
      name: faker.name.lastName(),
      lowDays: lowDays
    };
    locations.push(location);
  }
  return locations;
};

// Generates trip data
const genTrips = (blockSize) => {
  console.log(`Generating ${blockSize} trips`);

  const trips = [];
  for (let i = 0; i < blockSize; i++) {
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
