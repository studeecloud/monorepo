# StudeeCloud Server

## General Info

This server runs on Node.js 4.18.1, and is configured by default to run on port 8080.

## Database Setup

- Log into `psql` with the desired user
- In `psql`:
  - `/conninfo` to verify the database/user/socket/port of your current connection
  - `CREATE DATABASE studeecloud;`
  - to verify that it was created successfully:
    - list all databases with `\l`, the new `studeecloud` database should appear on the list
    - try to connect to it with `\c studeecloud`

## Routes

Generate a JWT user token to join a video room: `/video/token/:user/:room`

Example: `http://localhost:8080/video/token/bob/bobs_room`

Note that users need a unique token with a matching room name in order to join the same room.
