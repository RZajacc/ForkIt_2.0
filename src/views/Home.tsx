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
            user account, although if you want to see recipe details you need
            your account. You can either create a new one, or you can use one of
            supported logging options like Google, Facebook or Github.
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
