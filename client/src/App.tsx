import { useState } from "react";
import "./assets/styles/App.css";
import Chat from "./components/chat-ui/chat";
import Modal from "./components/common/modal";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <form className="modal-form">
          <label className="modal-label">Enter your username</label>
          <input className="modal-form-input" type="text" />
          <input className="modal-form-button" type="submit" />
        </form>
      </Modal>
      <Chat />
    </>
  );
}

export default App;
