import { Link, useRouteError } from "react-router-dom";
import { RouteErrorType } from "../types/types";

// ---Styles---
import "../style/errorpage.scss";
// ---Images---
import notFound from "/404-error.jpg";
import payment from "/empty-box.jpg";

function ErrorPage() {
  const error = useRouteError() as RouteErrorType;
  return (
    <>
      <main>
        <section className="error-container">
          <h3>{error.status + " - " + error.statusText}</h3>
          <p>{error.data}</p>
          <div className="error-image">
            <img
              src={error.status === 404 ? notFound : payment}
              alt="Error image"
            />
            <a id="attrib-link" href="http://www.freepik.com">
              Designed by stories / Freepik
            </a>
          </div>
          <Link id="redirect-link" to={"/"}>
            Take me back!
          </Link>
        </section>
      </main>
    </>
  );
}

export default ErrorPage;
