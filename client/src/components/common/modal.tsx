import "../../assets/styles/common/modal.css";

const Modal = ({ children, onClose, isOpen, hasCloseButton }) => {
  if (isOpen)
    return (
      <div className="overlay">
        <div className="content">
          <div className="close-button-container">
            {hasCloseButton ? (
              <span onClick={onClose} className="close-button">
                &times;
              </span>
            ) : null}
          </div>

          {children}
        </div>
      </div>
    );
  else return null;
};

export default Modal;
