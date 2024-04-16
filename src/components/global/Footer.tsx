import "../../style/footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__items">
        <li className="footer__item">
          <Link to={"https://github.com/RZajacc"}>
            <FontAwesomeIcon icon={faGithub} className="fa-xl" />
          </Link>
        </li>
        <li className="footer__item">
          <Link to={"https://www.linkedin.com/in/rafalzajac88/"}>
            <FontAwesomeIcon icon={faLinkedin} className="fa-xl" />
          </Link>
        </li>
        <li className="footer__item">
          <Link to={"contact"}>
            <FontAwesomeIcon icon={faEnvelope} className="fa-xl" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
