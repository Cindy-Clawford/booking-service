# Booking

## Scripts
Database seed script: "seedDB"
Build script: "react-dev"
Run script: "start"

## Database
Uses DBMS_NAME_HERE. Configure database settings in database/config.js

## Port settings
Set to use port 4002

## API
- GET /api/locations/:id
  - Returns location information for location ID.
- POST /api/trips/
  - Creates a new trip record in the database.
- GET /api/trips/:id
  - Return trip data for the given trip ID.
- PATCH /api/trips/:id
  - Update a trip record with new data.
- DELETE /api/trips/:id
  - Delete a trip from the database.