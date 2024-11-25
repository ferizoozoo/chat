import { useEffect, useState } from "react";
import "./assets/styles/App.css";
import Chat from "./components/chat-ui/chat";
import Modal from "./components/common/modal";
import { addUser } from "./apis/user";
import useLocalStorage from "./hooks/useLocalStorage";
import { LocalStorageConsts } from "./shared/constants";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [storedUser, setStoredUser] = useLocalStorage(LocalStorageConsts.USER);

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await addUser(data.username, data.email);
    if (response.status == 200) {
      const result = await response.json();
      setStoredUser(JSON.stringify(result));
    }
  };

  useEffect(() => {
    if (storedUser) {
      setIsOpen(false);
    }
  }, [storedUser]);

  return (
    <>
      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        hasCloseButton={false}
      >
        <form className="modal-form" onSubmit={handleForm}>
          <label className="modal-label">Enter your username</label>
          <input className="modal-form-input" type="text" name="username" />
          <label className="modal-label">Enter your email</label>
          <input className="modal-form-input" type="email" name="email" />
          <input className="modal-form-button" type="submit" />
        </form>
      </Modal>
      <Chat />
    </>
  );
}

export default App;
