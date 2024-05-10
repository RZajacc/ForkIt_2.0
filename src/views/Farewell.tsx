import crying from "/crying.png";
import "../style/farewell.scss";
import { Link } from "react-router-dom";

function Farewell() {
  return (
    <main>
      <div className="content-container">
        <h3>I'm sorry to see you go!</h3>
        <section className="img-section">
          <img src={crying} alt="" />
        </section>
        <h3>Hope to see you again!</h3>
        <Link to={"/"}>Take me back!</Link>
      </div>
      <a id="attrib-link" href="http://www.freepik.com">
        Designed by stories / Freepik
      </a>
    </main>
  );
}

export default Farewell;
