const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const targetRecords = 10000000;

// Generates location data in tuples
const genLocations = () => {
  let locations = csvWriter();
  locations.pipe(fs.createWriteStream('locations.csv'));
  for (let i = 0; i < targetRecords; i++) {
    const count = i;
    locations.write({
      id: count,
      rooms: Math.floor(Math.random() * 20) + 5,
      name: faker.name.lastName()
    })
  }
};

const update = (primaryCount) => {
  if(primaryCount % 10000 === 0) {
    console.log(`Writing ${primaryCount} of ${targetRecords}`);
  }
}

// Generates lowDays
const genLowDays = () => {
  let lowDays = csvWriter();
  const today = new Date();
  lowDays.pipe(fs.createWriteStream('lowdays.csv'));

  const wrapper = (count = 0, primaryCount = 0) => {
    let ok = true;

    do {
      primaryCount++;
      update(primaryCount);
      const quantLowDays = Math.floor(Math.random() * 10);
      for (var j = 0; j < quantLowDays && ok === true; j++) {
        ok = lowDays.write({
            id: count++,
            date: new Date(faker.date.future(0.5, today)),
            locationid: primaryCount
        });
      }
    } while (primaryCount < targetRecords && ok);

    if (primaryCount > 0) {
      lowDays.once('drain', wrapper.bind(this, count, primaryCount));
    }
  };

  wrapper();
}

const genTrips = () => {
  let writer = csvWriter();
  writer.pipe(fs.createWriteStream('trips.csv'));

  const wrapper = (count = 0, primaryCount = 0) => {
    let ok = true;
    do {
      primaryCount++;
      update(primaryCount);

      const numberOfResevervations = Math.floor(Math.random() * 25);
      for (let j = 0; j < numberOfResevervations && ok; j++) {
        const adults = Math.ceil(Math.random() * 10);
        const checkIn = faker.date.soon(90);
        ok = writer.write({
          locationId: primaryCount,
          checkIn: checkIn,
          checkOut: faker.date.future(0.12, checkIn),
          adults: adults,
          children: Math.floor(Math.random() * 10),
          rooms: Math.ceil(Math.random() * adults),
        });
      }
    } while (primaryCount < targetRecords && ok);

    if (primaryCount > 0) {
      writer.once('drain', wrapper.bind(this, count, primaryCount));
    }
  };

  wrapper();
};

// module.exports = { genLocations, genTrips, genLowDays };

// genLocations();
// genLowDays();
// genTrips();
