import { useEffect, useState } from "react";
import "./assets/styles/App.css";
import Chat from "./components/ui/chat";
import Modal from "./components/common/modal";
import { addUser } from "./apis/user";
import useLocalStorage from "./hooks/useLocalStorage";
import { LocalStorageConsts, SocketConsts } from "./shared/constants";
import useSocket from "./hooks/useSocket";

function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(true);
  const [storedUser, setStoredUser] = useLocalStorage(LocalStorageConsts.USER);

  const { emit } = useSocket(SocketConsts.ADD_USER, (data) => {
    console.log({ data });
  });

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await addUser(data.username, data.email);
    if (response.status == 200) {
      const result = await response.json();
      emit(SocketConsts.ADD_USER, {
        userId: result.id,
      });
      setStoredUser(JSON.stringify(result));
    }
  };

  useEffect(() => {
    if (storedUser) {
      setIsSignupModalOpen(false);
      return;
    }
    setIsSignupModalOpen(true);
  }, [storedUser]);

  return (
    <>
      <Modal
        onClose={() => setIsSignupModalOpen(false)}
        isOpen={isSignupModalOpen}
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
