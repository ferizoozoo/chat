import '../../assets/styles/chat-ui/chat-messages.css'

function ChatMessages({ messages }: { messages: String}) {
  return <>
            {messages?.map((message, index) => (
                <div key={index} className={`message-box ${message.isUser ? 'message-right' : 'message-left'}`}>
                {message.text}
              </div>
            ))}
    </>
}

export default ChatMessages
