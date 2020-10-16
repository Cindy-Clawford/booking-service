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
    date0 DATE NOT NULL,
    date1 DATE,
    date2 DATE,
    date3 DATE,
    date4 DATE,
    date5 DATE,
    date6 DATE,
    date7 DATE,
    date8 DATE,
    date9 DATE,
    locationId INTEGER
  );
