import "./Footer.css";
import github from "../../images/github.svg";
import facebook from "../../images/facebook.svg";

function Footer({}) {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__left">
            <p className="footer__supersite">
              © 2024 Supersite, Powered by News API
            </p>
          </div>

          <div className="footer__right">
            <div className="footer__right-text">
              <p className="footer__Home">Home</p>
              <p className="footer__tripleten">TripleTen</p>
            </div>
            <div className="footer__right-icons">
            <img src={github} alt="github" className="footer__github" />
            <img src={facebook} alt="facebook" className="footer__facebook" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
