import "../../assets/styles/chat-ui/chat-messages.css";

function ChatMessages({
  messages,
  userId,
}: {
  messages: string;
  userId: string;
}) {
  return (
    <>
      {messages?.map((message, index) => (
        <div
          key={index}
          className={`message-box ${
            message?.sender === userId ? "message-right" : "message-left"
          }`}
        >
          {message?.text}
        </div>
      ))}
    </>
  );
}

export default ChatMessages;
