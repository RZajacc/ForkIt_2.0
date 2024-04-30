import { Link, useRouteError } from "react-router-dom";
import { RouteErrorType } from "../types/types";
import "../style/errorpage.scss";

function ErrorPage() {
  const error = useRouteError() as RouteErrorType;
  return (
    <>
      <main>
        <section className="error-container">
          <h3 className="text-center">
            The page you're trying to access doesnt exist!
          </h3>
          <p className="text-center">{error.error.message}</p>
          <Link to={"/"}>Take me back!</Link>
        </section>
      </main>
    </>
  );
}

export default ErrorPage;
