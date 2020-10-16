const { genLocations, genTrips, genLowDays } = require('./genRecords.js');
const { Pool } = require('pg');
const format = require('pg-format');
const { host, user, password, database, port } = require('./config.js');
const faker = require('faker');

const pool = new Pool({
  host,
  database,
  user,
  password,
  port
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1)
});

// CHECK CONNECTION
pool.connect()
.then((client) => {
  client.release();
    console.log('connection successful');
  })
  .catch((err) => {
    console.error('ERROR: Could not connect', err);
  });

// Seed Locations
const seedLocations = () => {
  const blockSize = 100000;
  const targetRecords = 10000000;
  const blockQuant = targetRecords / blockSize;
  for (let i = 1; i <= blockQuant; i++) {
    const blockNum = i;
    pool
      .connect()
      .then((client) => {
        const locations = genLocations(blockSize);
        return client
          .query(format('INSERT INTO locations (rooms, name) VALUES %L', locations))
          .then((res) => {
            client.release();
            console.log(`Finished locations block ${blockNum} of ${blockQuant}`);
          });
      })
      .catch((err) => {
        console.error('ERROR: failed to seed locations', err);
      });
  }
}();

// Generate lowDays
// const seedLowDays = () => {
//   // TODO: Edit these values. More blocks/smaller blocks.
//   const blockSize = 100000;
//   const targetRecords = 10000000;
//   const blockQuant = targetRecords / blockSize;
//   for (let i = 1; i <= blockQuant; i++) {
//     const blockNum = i;
//     pool
//       .connect()
//       .then((client) => {
//         const lowDays = genLowDays(blockSize, (blockSize * (blockNum - 1)) + 1);
//         return client
//           .query(format('INSERT INTO lowDays (date, locationId) VALUES %L', lowDays))
//           .then((res) => {
//             client.release();
//             console.log(`Finished lowDays block ${blockNum} of ${blockQuant}`);
//           });
//       })
//       .catch((err) => {
//         console.error('ERROR: failed to seed lowDays', err);
//       });
//   }
// }

// Generate Trips
// pool.connect()
//   .then(client => {
//     // TODO: Gen data
//     return client
//       .query('INSERT INTO lowDays (date, locationId) VALUES($1, $2)', [new Date(), 2])
//       .then(res => {
//         client.release()
//         console.log(res.rows);
//       })
//       .catch(err => {
//         client.release();
//         console.error(err);
//       });
//   });
