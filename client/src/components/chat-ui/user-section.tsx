import "../../assets/styles/chat-ui/user-section.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageConsts } from "../../shared/constants";
import logoutIcon from "../../assets/icons/logout.svg";

const UserSection = () => {
  const [user, setUser] = useLocalStorage(LocalStorageConsts.USER);

  const username = JSON.parse(user)?.username;

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="user">
      <span className="username">{username}</span>
      <button className="logout-button" onClick={handleLogout}>
        <img src={logoutIcon} />
      </button>
    </div>
  );
};

export default UserSection;
