import { useEffect, useRef, useState } from 'react'
import '../../assets/styles/chat-ui/chat.css'
import { getMessages } from '../../mock';
import ChatMessages from './chat-messages';
import ChatForm from './chat-form';

function Chat() {
  const [messages, setMessages] = useState<{ text: String, isUser: boolean }[]>();

  const messagesEndRef = useRef(null);

  const handleSubmit = (message) => {
    if (message.trim() !== '') {
      setMessages(messages => [...messages, { text: message, isUser: true }])
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
            <ChatMessages messages={messages} />
            <div ref={messagesEndRef} />
          </div>
          <div className='chat-write'>
           <ChatForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
