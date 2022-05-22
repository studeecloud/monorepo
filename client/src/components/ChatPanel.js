import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { BigHead } from '@bigheads/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function ChatPanel({ onSelect, userName }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    axios
      .get('http://localhost:8080/messages')
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section
      className="dashboard__panel relative bg-meringue"
      style={{ border: '1px solid black' }}
    >
      <button
        type="button"
        className="mt-3 absolute"
        style={{ width: '93%' }}
        onClick={onSelect}
      >
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>
      <h1 className="mt-3 mb-5 font-display text-4xl text-black text-center">
        Chat
      </h1>
      <article className="flex flex-col justify-between w-2/3 mx-auto bg-gold p-2 rounded max-h-5/6 h-5/6 overflow-auto">
        <div>
          <MessageList messages={messages} />
        </div>
        <MessageForm getMessages={getMessages} userName={userName} />
      </article>
    </section>
  );
}