DROP TABLE IF EXISTS users_meetings CASCADE;

CREATE TABLE users_meetings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  meetings_id INT REFERENCES meetings(id)
);