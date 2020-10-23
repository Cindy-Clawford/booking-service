const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const targetRecords = 10000000;

// js date to pg date
function pgFormatDate(date) {
  function zeroPad(d) {
    return ("0" + d).slice(-2)
  };
  var parsed = new Date(date)
  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join('-');
};

// Logs update in console
const update = (primaryCount, name) => {
  if(primaryCount % 100000 === 0) {
    console.log(`${name}: Writing ${primaryCount} of ${targetRecords}`);
  }
};

// Generates location data in tuples
const genLocations = () => {
  let locations = csvWriter();
  locations.pipe(fs.createWriteStream('./database/data/locations.csv'));

  const wrapper = (primaryCount = 0) => {
    let ok = true;
    do {
      update(primaryCount, 'Locations');
      ok = locations.write({
        id: primaryCount++,
        rooms: Math.floor(Math.random() * 20) + 5,
        name: faker.name.lastName()
      });
    } while (primaryCount < targetRecords && ok);
    if (primaryCount > 0) {
      locations.once('drain', wrapper.bind(this, primaryCount));
    }
  }

  wrapper();
};

// Generates lowDays
const genLowDays = () => {
  let lowDays = csvWriter();
  const today = new Date();
  lowDays.pipe(fs.createWriteStream('./database/data/lowdays.csv'));

  const wrapper = (count = 0, primaryCount = 0) => {
    let ok = true;

    do {
      update(primaryCount, 'Low Days');
      primaryCount++;
      const quantLowDays = Math.floor(Math.random() * 10);
      for (var j = 0; j < quantLowDays && ok === true; j++) {
        ok = lowDays.write({
            id: count++,
            locationid: primaryCount,
            date: pgFormatDate(faker.date.future(0.5, today)),
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
  writer.pipe(fs.createWriteStream('./database/data/trips.csv'));

  const wrapper = (count = 0, primaryCount = 0) => {
    let ok = true;
    do {
      update(primaryCount, 'Trips');
      const numberOfResevervations = Math.floor(Math.random() * 15);
      for (let j = 0; j < numberOfResevervations && ok; j++) {
        const adults = Math.ceil(Math.random() * 10);
        const checkIn = faker.date.soon(90);
        ok = writer.write({
          id: count++,
          locationid: primaryCount,
          checkIn: pgFormatDate(checkIn),
          checkOut: pgFormatDate(faker.date.future(0.12, checkIn)),
          adults: adults,
          children: Math.floor(Math.random() * 10),
          rooms: Math.ceil(Math.random() * adults),
        });
      }
      primaryCount++;
    } while (primaryCount < targetRecords && ok);

    if (primaryCount > 0) {
      writer.once('drain', wrapper.bind(this, count, primaryCount));
    }
  };

  wrapper();
};

// module.exports = { genLocations, genTrips, genLowDays };

// genLocations();
genLowDays();
genTrips();
