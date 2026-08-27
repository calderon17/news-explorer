import "./Footer.css";
import github from "../../images/github.svg";
import facebook from "../../images/facebook.svg";

function Footer() {
  return (
      <footer className="footer">
        <div className="container">
          <div className="footer__left">
            <p className="footer__supersite">
              © 2024 Supersite, Powered by News API
            </p>
          </div>

          <div className="footer__right">
            <nav className="footer__right-text">
              <a href="/" className="footer__Home">Home</a>
              <a href="https://tripleten.com" target="_blank" rel="noopener noreferrer" className="footer__tripleten">TripleTen</a>
            </nav>
            <div className="footer__right-icons">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img src={github} alt="github" className="footer__github" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={facebook} alt="facebook" className="footer__facebook" />
            </a>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
