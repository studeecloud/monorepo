DROP TABLE IF EXISTS meetings CASCADE;

CREATE TABLE meetings (
  id SERIAL PRIMARY KEY,
  room_string VARCHAR(255) NOT NULL,
  meeting_name VARCHAR(255) NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  open_to_guests BOOLEAN NOT NULL
);