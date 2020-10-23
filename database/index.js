var configObject = require('./config.js')
const { Client } = require('pg');
const client = new Client(configObject);

client.connect();


var createTrip = ({ locationid, checkin, checkout, adults, children, rooms }) => {
  const text = 'INSERT INTO trips(locationid, checkin, checkout, adults, children, rooms) VALUES($1, $2, $3, $4, $5, $6)'
  const values = [locationid, checkin, checkout, adults, children, rooms];
  return new Promise((resolve, reject) => {
    client
      .query(text, values)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error('Error creating a new trip in database/index.js', err);
        reject(err);
      });
  })
};

var getLowDays = (locationId) => {
  const text = 'SELECT * FROM lowdays WHERE locationid=$1';
  const value = [locationId];
  return new Promise((resolve, reject) => {
    client
      .query(text, value)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })

  })
}

var getTripsForLocation = (locationId) => {
  const text = 'SELECT * FROM trips WHERE locationid=$1';
  const value = [locationId];
  return new Promise((resolve, reject) => {
    client
      .query(text, value)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error('Error querying trips in database/index.js', err);
        reject(err);
      });
  });
}

var getLocation = (locationId) => {
  const text = 'SELECT * FROM locations WHERE id=$1';
  const value = [locationId];
  return new Promise((resolve, reject) => {
    client
      .query(text, value)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error('Error getting location in database/index.js', err);
        reject(err);
      });
  });
}

const updateTrip = ({ id, checkin, checkout, adults, children, rooms }) => {
  const text = 'UPDATE trips SET (checkin, checkout, adults, children, rooms) = ($1, $2, $3, $4, $5) WHERE id=$6';
  const values = [checkin, checkout, adults, children, rooms, id];
  return new Promise((resolve, reject) => {
    client
      .query(text, values)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error('Error updating trip in database/index.js', err);
        reject(err);
      })
  });
};

const deleteTrip = (tripID) => {
  const text = `DELETE FROM trips WHERE id=${tripID}`;
  return new Promise((resolve, reject) => {
    client
      .query(text)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error('Error deleteing trip in database/index.js', err);
        reject(err);
      });
  });
}

module.exports = {
  getLowDays,
  createTrip,
  getTripsForLocation,
  getLocation,
  updateTrip,
  deleteTrip
}