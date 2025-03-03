import { useState } from "react";
import "../../assets/styles/chat-ui/chat-form.css";

function ChatForm({ handleSubmit, userId }) {
  const [message, setMessage] = useState<string>("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.trim() != "") {
      handleSubmit(message, userId);
      setMessage("");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="send-message-input"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="send-message-submit" type="submit">
        +
      </button>
    </form>
  );
}

export default ChatForm;
