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
    <section className="dashboard__panel relative border bg-meringue">
      <button
        type="button"
        className="absolute"
        style={{ top: '3.5%', right: '2%' }}
        onClick={onSelect}
      >
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>
      <h1 className="mt-3 mb-5 font-display text-4xl text-center">Chat</h1>
      <article className="flex flex-col items-center w-2/3 mx-auto">
        <MessageList messages={messages} />
        <MessageForm getMessages={getMessages} userName={userName} />
      </article>
    </section>
  );
}
