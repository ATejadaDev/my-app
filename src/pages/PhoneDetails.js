import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

function PhoneDetails({ phonesList}) {

    const [phoneDetails, setPhoneDetails] = useState(null);
    const [fetchingDetails, setFetchingDetails] = useState(true);

    // eslint-disable-next-line no-undef
    const { phoneId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPhoneDetails();

    }, [phoneId]);

    const getPhoneDetails = async () => {
        setFetchingDetails(true);

        // eslint-disable-next-line no-undef
        const phoneToRender = phonesList.find(eachPhone.id === Number(phoneId));

        setTimeout(() => {
            if (!phoneToRender) {
                navigate("/not-found");
                return;
            }
            setPhoneDetails(phoneToRender);
            setFetchingDetails(false);
        }, 500);
    };

    const {
        name,
        manufacturer,
        description,
        color,
        price,
        screen,
        processor,
        ram,
        imageFileName,
    } = phoneDetails;

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={`/images/${imageFileName}`} />

            <Card.body>
                <Card.Title>{name} by {manufacturer}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.body>

            <ListGroup className="list-grop-flush">
                <ListGroupItem>color: {color}</ListGroupItem>
                <ListGroupItem>{screen}</ListGroupItem>
                <ListGroupItem>{processor}</ListGroupItem>
                <ListGroupItem>{ram}</ListGroupItem>
                <ListGroupItem>{price} €</ListGroupItem>
            </ListGroup>

            <Card.Body>
                <Link to="/">Go back</Link>
            </Card.Body>
        </Card>
    )
}

export default PhoneDetails;