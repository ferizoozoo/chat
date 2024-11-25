import "../../assets/styles/common/modal.css";

const Modal = ({ children, onClose, isOpen }) => {
  if (isOpen)
    return (
      <div className="overlay">
        <div className="content">
          <div className="close-button-container">
            <span onClick={onClose} className="close-button">
              &times;
            </span>
          </div>

          {children}
        </div>
      </div>
    );
  else return null;
};

export default Modal;
