import { useEffect, useState } from "react";
import "./assets/styles/App.css";
import Chat from "./components/ui/chat.tsx";
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

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const username = String(formData.get("username") || "");
    const email = String(formData.get("email") || "");

    const response = await addUser(username, email);
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
        <form className="modal-form" id="user-form" onSubmit={handleForm}>
          <label className="modal-label" htmlFor="username">
            Enter your username
          </label>
          <input
            className="modal-form-input"
            type="text"
            id="username"
            name="username"
          />
          <label className="modal-label" htmlFor="email">
            Enter your email
          </label>
          <input
            className="modal-form-input"
            type="email"
            id="email"
            name="email"
          />
          <input className="modal-form-button" type="submit" />
        </form>
      </Modal>

      <Chat />
    </>
  );
}

export default App;
