const db = require('../database/index.js');
const path = require('path');
const express = require('express');

const app = express();

const PORT = 4002;

app.use(express.static(path.join(__dirname, '..','public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/api/trips/:id', (req, res) => {
  db.getTripsForLocation(req.params.id)
  .then(result => {
    res.send(result);
  });
});

app.get('/api/lowdays/:locationid', (req, res) => {
  db.getLowDays(req.params.locationid)
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.error('Error retrieving lowdays in server/index.js', err);
  })
})

app.get('/api/locations/:id', (req, res) => {
  db.getLocation(req.params.id)
  .then(result => {
    res.send(result);
  });
})

app.post('/api/trips/', (req, res) => {
  db.createTrip(req.body.trip)
  .then((result => {
    res.send(result);
  }));
});

app.patch('/api/trips/', (req, res) => {
  db.updateTrip(req.body.trip)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.error(`ERROR: failed to update trip with id ${req.params.id}`);
    console.error(err);
  });
});

app.delete('/api/trips/:id', (req, res) => {
  db.deleteTrip(req.params.id)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.error(`ERROR: failed to delete trip with id ${req.params.id}`);
    console.error(err);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});