import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getMessages } from './mock';

function App() {
  const [messages, setMessages] = useState<{ text: String, isUser: boolean }[]>();
  const [message, setMessage] = useState<String>("");

  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() !== '') {
      setMessages(messages => [...messages, { text: message, isUser: true }])
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(getMessages());
  }, [])

  return (
    <>
      <div>
        <div className='header'>
          <h1>Welcome to this chat!</h1>
        </div>
        <div className='chatbox'>
          <div className='chat-show'>
            {messages?.map(message => (
                <div className={`message-box ${message.isUser ? 'message-right' : 'message-left'}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='chat-write'>
            <form onSubmit={handleSubmit}>
              <input className="send-message-input"
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className='send-message-submit' type='submit'>+</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
