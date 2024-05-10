import "../style/home.scss";

function Home() {
  return (
    <>
      <main>
        <section className="main-content">
          <h1>Welcome to ForkIt project!</h1>

          <p>
            Fork it is a React application, allowing you to browse food recipes
            from different cuisines. Data is fetched from a Spoonacular open
            API*.
          </p>
          <p>
            Most of the page content you are allowed to browse without setting a
            user account, although if you want to see recipe details (and
            probably you do..) I will kindly ask you too go through the process
            or creating new account. Sorry for inconvenience!😊
          </p>
          <p>
            With your account set up you can also comment recipes and add them
            to your favourites!
          </p>
          <p>
            <em>
              * Spoonacular runs on a free tier with a limited request rate so
              if recipes don't display on a website properly it's probably not a
              bug, but exceeded limit
            </em>
          </p>
        </section>
      </main>
    </>
  );
}

export default Home;
