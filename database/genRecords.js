const faker = require('faker');

// Generates location data in tuples
// 0: rooms, 1: name
const genLocations = (blockSize) => {
  const locations = [];
  for (let i = 0; i < blockSize; i++) {

    const location = [
      Math.floor(Math.random() * 20) + 5,
      faker.name.lastName()
    ];
    locations.push(location);
  }
  return locations;
};

// Generates lowDays
// 0-9: date, 10: locationid
const genLowDays = (blockSize, startingIndex) => {
  const lowDays = [];
  for (let i = startingIndex; i < startingIndex + blockSize; i++) {
    const quantLowDays = Math.floor(Math.random() * 30);
    for (var j = 0; j < quantLowDays; j++) {
      lowDays.push([
          new Date(faker.date.future(0.5, new Date())),
          i
      ]);
    }
  }
  return lowDays;
}

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

module.exports = { genLocations, genTrips, genLowDays };

console.log(genLowDays(25, 1));
