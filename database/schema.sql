DROP SCHEMA IF EXISTS booking CASCADE;

CREATE SCHEMA booking
  CREATE TABLE booking.trips (
    id SERIAL NOT NULL PRIMARY KEY,
    checkIn DATE NOT NULL,
    checkOut DATE NOT NULL,
    adults INTEGER,
    children INTEGER,
    rooms INTEGER NOT NULL,
    locationId INTEGER
  )
  CREATE TABLE booking.locations (
    id SERIAL NOT NULL PRIMARY KEY,
    rooms INTEGER NOT NULL,
    name TEXT
  )
  CREATE TABLE booking.lowDays (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    locationId INTEGER
  );
