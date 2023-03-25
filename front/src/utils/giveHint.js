import { Alert } from "react-bootstrap";

const giveHint = () => {
    return (
        <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
                If you want to create new article about some place, you nedd to Right click the point on the map.
                Then, enter the name of place and click the button!
                You will figure what to do next. =)
                Good luck!
            </p>
        </Alert>
    )
};

export default giveHint;