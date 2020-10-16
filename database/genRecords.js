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
    const quantLowDays = Math.floor(Math.random() * 35) + 5;
    const dates = [];
    for (var j = 0; j < quantLowDays; j++) {
      dates.push(new Date());
    }
    for (var k = 0; k < Math.ceil(dates.length / 10); k++) {
      lowDays.push([
          dates[k * 10] || null,
          dates[k * 10 + 1] || null,
          dates[k * 10 + 2] || null,
          dates[k * 10 + 3] || null,
          dates[k * 10 + 4] || null,
          dates[k * 10 + 5] || null,
          dates[k * 10 + 6] || null,
          dates[k * 10 + 7] || null,
          dates[k * 10 + 8] || null,
          dates[k * 10 + 9] || null,
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
