import { Link, useRouteError } from "react-router-dom";
import { RouteErrorType } from "../types/types";
import "../style/errorpage.scss";

function ErrorPage() {
  const error = useRouteError() as RouteErrorType;

  return (
    <>
      <main>
        <section className="error-container">
          <h3>{error.status + " " + error.statusText}</h3>
          <p>{error.data}</p>
          <Link to={"/"}>Take me back!</Link>
        </section>
      </main>
    </>
  );
}

export default ErrorPage;
