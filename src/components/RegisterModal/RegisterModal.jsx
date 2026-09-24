import "./RegisterModal.css";
import { useState , useEffect} from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  onSwitchModal,
  isLoading = false
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await onRegister({ email, password, username });
    } catch (err) {
      setErrorMessage(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Signing up..." : "Sign up"}
      modalType="signup"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
