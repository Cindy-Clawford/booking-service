const faker = require('faker');

console.log('Record Generator Launched!');

// Generates location data
const genLocations = (blockSize) => {
  console.log(`Generating ${blockSize} locations`);
  const locations = [];
  for (let i = 0; i < blockSize; i++) {

    // if (i % Math.floor(blockSize / 8) === 0) {
    //   progressUpdate(i);
    // }

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

    // if (i % Math.floor(blockSize / 8) === 0) {
    //   progressUpdate(i);
    // }

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

// Logs progress reports every 12.5 percent
const progressUpdate = (i) => {
  const percentage = (i / blockSize) * 100;
  console.log(`${percentage}% completed.`);
}

module.exports = { genLocations, genTrips };