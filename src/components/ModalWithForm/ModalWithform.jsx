import "./ModalWithForm.css";
import close from "../../images/close.svg";

function ModalWithForm({
  title,
  onClose,
  isOpen,
  onSubmit,
  children,
  buttonText,
  switchButton,
  modalType,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className={`modal__content modal__content_type_${modalType}`}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-container">
            <button type="submit" className={`modal__submit`}>
              {buttonText}
            </button>
            {switchButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
