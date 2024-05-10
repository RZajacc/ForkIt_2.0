import { ThreeCircles } from "react-loader-spinner";

function LoadingPage() {
  return (
    <>
      <main>
        <div className="loading-page">
          <h1>Loading... Please wait...</h1>
          <ThreeCircles height="120" width="120" wrapperClass="spinnerClass" />
        </div>
      </main>
    </>
  );
}

export default LoadingPage;
