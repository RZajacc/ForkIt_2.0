import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Col, Container, Row } from "react-bootstrap"
import { db } from "../config/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import RecipeCardDashboard from "./RecipeCardDashboard";
import { userFavs } from "../types/types";
import "../style/Dashboard.css";


function DashboardFavs() {

    const { user } = useContext(AuthContext);
    const [userFavs, setUserFavs] = useState<userFavs[] | null>(null)

    // * Get favourites with live update
    const getFavouritesLive = () => {
        const q = query(collection(db, "favourites"), where("userID", "==", user?.uid));
        onSnapshot(q, (querySnapshot) => {
            const userFavs: userFavs[] = [];
            querySnapshot.forEach((doc) => {
                userFavs.push(doc.data() as userFavs);
            });
            setUserFavs(userFavs);
        });
    }

    useEffect(() => {
        getFavouritesLive();
    }, [])


    return (
        <>
            <Container className="favs-container">
                <Row className="justify-content-md-center" >
                    <Col xs lg="5">
                        {userFavs?.length == 0 ? <h4 className="noFavsText">...No favourites yet...</h4> : ''}
                    </Col>
                </Row>
                <Row xxl={6} xl={5} lg={4} md={3} sm={2} xs={1} className="g-4">
                    {userFavs && userFavs.map((recipe) => {
                        return <RecipeCardDashboard recipe={recipe} key={recipe.recipeID} />
                    })}
                </Row>
            </Container>
        </>
    )
}

export default DashboardFavs