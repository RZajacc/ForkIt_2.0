import { Col, Container, Row } from "react-bootstrap";
import TopSection from "../components/TopSection";
import "../style/Global.css";

function Home() {

  return (
    <>
      <TopSection />
      <Container className="home-container">
        <Row className="justify-content-md-center text-center">
          <h1>Welcome to ForkIt project!</h1>
        </Row>
        <Row className="justify-content-md-center text-center">
          <Col xs lg="7" className="home-column">
            <p>Fork it is a React application, allowing you to browse food recipes from different cuisines.
              Data is fetched from a Spoonacular open API*.
            </p>
            <p>Most of the page content you are allowed to browse without setting a user account,
              although if you want to see recipe details you need your account. You can either create a new
              one, or you can use one of supported logging options like Google, Facebook or Github.
            </p>
            <p>With your account set up you can also comment recipes and add them to your favourites!</p>
            <p><em>* Spoonacular runs on a free tier with a limited request rate so if recipes don't display
              on a website properly it's probably not a bug, but exceeded limit</em></p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home