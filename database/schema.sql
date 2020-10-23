DROP SCHEMA IF EXISTS booking CASCADE;

CREATE SCHEMA booking
  CREATE TABLE locations (
    id SERIAL NOT NULL PRIMARY KEY,
    rooms INTEGER NOT NULL,
    name TEXT
  )
  CREATE TABLE lowDays (
    id SERIAL NOT NULL PRIMARY KEY,
    locationid INTEGER NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_location
      FOREIGN KEY(locationid)
        REFERENCES locations(id)
  )
  CREATE TABLE trips (
    id SERIAL NOT NULL PRIMARY KEY,
    locationid INTEGER NOT NULL,
    checkIn DATE NOT NULL,
    checkOut DATE NOT NULL,
    adults INTEGER,
    children INTEGER,
    rooms INTEGER NOT NULL,
    CONSTRAINT fk_location
      FOREIGN KEY(locationid)
        REFERENCES locations(id)
  );

COPY locations(id, rooms, name)
FROM '/home/cjx/Programming/Galvanize/SDC/booking-service/database/data/locations.csv'
DELIMITER ','
CSV HEADER;

COPY lowDays(id, locationId, date)
FROM '/home/cjx/Programming/Galvanize/SDC/booking-service/database/data/lowdays.csv'
DELIMITER ','
CSV HEADER;

COPY trips(id, locationId, checkIn, checkOut, adults, children, rooms)
FROM '/home/cjx/Programming/Galvanize/SDC/booking-service/database/data/trips.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX lowdays_location_id ON lowdays(locationId);
CREATE INDEX trips_location_id ON trips(locationId);
