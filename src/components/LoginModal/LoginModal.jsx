import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithform";
import { useState, useEffect } from "react";
import { authenticateUser } from "../../data/users";

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  onSwitchModal,
  errorMessage: externalError,
  isLoading = false,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(""); // past way of using error

  // using parent errowhen provided, else local
  const errorMessage = externalError || localError;

  ////////////////// Handlers ///////////

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (localError) setLocalError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    try {
      await onLogin({ email, password });
      setEmail("");
      setPassword("");
    } catch {
      setLocalError("Invalid email or password. Please try again.");
    }
  };

  ///////// useEffect ///////////
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setLocalError("");
    }
  }, [isOpen]);

  useEffect(() => {
    setIsFormValid(
      email.trim().length > 0 &&
        password.trim().length > 0 &&
        email.includes("@")
    );
  }, [email, password]);

  return (
    <ModalWithForm
      title="Sign in"
      buttonText={isLoading ? "Logging in.." : "Log in"}
      modalType="signin"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid && !isLoading}
      isDisabled={isLoading || !isFormValid}
      switchButton={
        <button
          type="button"
          className="modal__submit-switch"
          onClick={onSwitchModal}
        >
          or <span className="highlight">Sign up</span>
        </button>
      }
    >
      {errorMessage && (
        <div className="modal__error-message">{errorMessage}</div>
      )}

      <label htmlFor="login-email" className="modal__label modal__label-email">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="email"
          required
          onChange={handleEmailChange}
          value={email}
          // disabled={isLoading}
        />
      </label>
      <label
        htmlFor="login-password"
        className="modal__label modal__label-password"
      >
        Password{" "}
        <input
          type="password"
          name="password"
          className={`modal__input ${
            errorMessage ? "modal__input_type_error" : ""
          }`}
          id="login-password"
          placeholder="password"
          autoComplete="current-password"
          required
          onChange={handlePasswordChange}
          value={password}
          // disabled={isLoading}
        />
      </label>
    </ModalWithForm>
  );
}
