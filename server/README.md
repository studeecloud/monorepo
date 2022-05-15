# README

## DEPENDENCIES

- Ruby 3.1.1
- Rails 6.1.6
- Twilio Video API

## APIs

### Twilio Video API

`curl` request to create a Room:

```bash
curl -XPOST 'https://video.twilio.com/v1/Rooms' -u '{API Key SID}:{API Secret}' -d 'UniqueName=DailyStandup'
```

Example of Room object:

```json
{
  "unique_name": "DailyStandup",
  "date_updated": "2022-05-15T17:26:32Z",
  "media_region": "us1",
  "max_participant_duration": 14400,
  "duration": null,
  "video_codecs": ["VP8", "H264"],
  "large_room": false,
  "enable_turn": true,
  "empty_room_timeout": 5,
  "sid": "RM4cc18aa4a604d878f7f1fb5b5e2f2327",
  "type": "group",
  "status_callback_method": "POST",
  "status": "in-progress",
  "audio_only": false,
  "unused_room_timeout": 5,
  "max_participants": 50,
  "max_concurrent_published_tracks": 170,
  "url": "https://video.twilio.com/v1/Rooms/RM4cc18aa4a604d878f7f1fb5b5e2f2327",
  "record_participants_on_connect": false,
  "account_sid": "AC715697874243866d7b71c7fc02a56f3d",
  "end_time": null,
  "date_created": "2022-05-15T17:26:32Z",
  "status_callback": null,
  "links": {
    "recordings": "https://video.twilio.com/v1/Rooms/RM4cc18aa4a604d878f7f1fb5b5e2f2327/Recordings",
    "participants": "https://video.twilio.com/v1/Rooms/RM4cc18aa4a604d878f7f1fb5b5e2f2327/Participants",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RM4cc18aa4a604d878f7f1fb5b5e2f2327/RecordingRules"
  }
}
```

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
