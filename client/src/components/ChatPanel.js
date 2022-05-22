import { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { BigHead } from '@bigheads/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function ChatPanel({ onSelect }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    axios.get('http://localhost:8080/messages')
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section
      className="dashboard__panel bg-meringue"
      style={{ border: '1px solid black' }}
    >
      <button
        type='button'
        className="flex mx-6"
        onClick={onSelect}
      >
        <FontAwesomeIcon icon={solid('expand')} className="h-7" />
      </button>
      <h1 className="font-display text-4xl text-black text-center">Chat</h1>
      <article className='flex flex-col items-center'>
        <MessageList messages={messages} />
        <MessageForm getMessages={getMessages} />
      </article>
    </section>

  );
};