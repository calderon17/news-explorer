import "./RegisterModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  onClose,
  isOpen,
  // onRegister,
  onSwitchModal,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      modalType="signup"
      onClose={onClose}
      isOpen={isOpen}
      //   onSubmit={handleSubmit}
      switchButton={
        <button
          type="button"
          className="modal__submit-switch"
          onClick={onSwitchModal}
        >
          or <span className="highlight">log in</span>
        </button>
      }
    >
      {errorMessage && (
        <div className="modal__error-message">{errorMessage}</div>
      )}

      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="email"
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="password"
          autoComplete="username"
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Username{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
        />
      </label>
    </ModalWithForm>
  );
}
