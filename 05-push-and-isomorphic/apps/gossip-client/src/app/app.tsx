import React, { useState, useEffect, useRef, FormEvent } from 'react';

import { Message, languageCheck, OK } from '@oasis-demos/filter';

import { ChatConnection } from './ChatApi';

import './app.css';

let keyInc = 0;

const baseChatApi = '/chatapi/';

export const App = () => {
  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {
    const chat = new ChatConnection<Message>(
      baseChatApi + 'feed',
      (message: Message) => {
        setMsgs((msgs) => [...msgs, { ...message, key: keyInc++ }]);
      }
    );
    return () => {
      chat.disconnect();
    };
  }, []);

  const inputEl = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputEl.current) {
      const text = inputEl.current.value;
      inputEl.current.value = '';

      if (languageCheck(text) === OK) {
        const message: Message = { text };
        await fetch(baseChatApi + 'message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }
      inputEl.current.focus();
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Chat app</h1>
        <form onSubmit={handleSubmit} className="across">
          <p>Your message:</p>
          <input ref={inputEl} type="text" width="50"></input>
          <input type="submit" value="Send"></input>
        </form>
      </header>
      <main>
        <h2>Messages:</h2>
        <ul>
          {msgs.map((m) => (
            <li key={m.key}>{m.text}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
