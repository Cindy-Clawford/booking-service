const db = require('../database/index.js');
const path = require('path');
const express = require('express');

const app = express();

const PORT = 4002;

app.use(express.static(path.join(__dirname, '..','public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/api/trips/:id', (req, res) => {
  db.getReservationsForLocation(req.params.id)
  .then(result => {
    res.send(result);
  });
});

app.get('/api/low-days/:id', (req, res) => {
  db.getLocationInformation(req.params.id)
  .then(result => {
    res.send(result);
  });
})

app.post('/api/trips/', (req, res) => {
  db.save(req.body.trip)
  .then((result => {
    res.send(result);
  }))
});

app.patch('/api/update/', (req, res) => {
  // TODO: Update a trip.
});

app.delete('/api/removal/', (req, res) => {
  // TODO: Delete a trip.
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});