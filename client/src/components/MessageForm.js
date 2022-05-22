import { useState } from 'react';
import axios from 'axios';

export default function MessageForm({ getMessages, userName }) {
  const [message, setMessage] = useState('');

  const disableSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:8080/messages', {
        message: message,
        userName: userName,
      })
      .then((res) => {
        getMessages();
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage('');
  };

  return (
    <section>
      <form
        method="post"
        action="/messages"
        className="flex flex-col items-center"
        onSubmit={disableSubmit}
      >
        <textarea
          className="border-2 border-dark-gray p-2 rounded"
          name="message"
          placeholder="Talk to me..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ resize: 'none', width: 500, height: '2rem' }}
        ></textarea>
        <input
          type="submit"
          value="Message"
          className="border-2 border-dark-gray p-2 rounded w-48 my-2.5"
          onClick={handleSubmit}
        />
      </form>
    </section>
  );
}
