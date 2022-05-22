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
        userName: userName || 'NullUser',
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
    <section className="w-full">
      <form
        method="post"
        action="/messages"
        className="flex flex-col items-center"
        onSubmit={disableSubmit}
      >
        <div className="flex w-full">
          <textarea
            className="border-2 border-dark-gray py-2 px-3 mr-2 rounded w-full"
            name="message"
            placeholder="Talk to me..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ resize: 'none' }}
          ></textarea>
          <input
            type="submit"
            value="Send"
            className="w-24 p-2 border-2 border-dark-gray rounded"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </section>
  );
}
