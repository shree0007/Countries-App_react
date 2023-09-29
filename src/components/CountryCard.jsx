import { Card, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CountryCard = ({ country }) => {
    return (

        <Col className="mt-5">
            <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
            >
                <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                        <img style={{ height: "250px", width: "auto", border: "solid lightgray 1px" }} src={country.flags.png} alt="Card cap" /><br />
                        <Card.Title>{country.name.common}</Card.Title>
                        <Card.Subtitle className="mb-5 text-muted">
                            {country.capital}
                        </Card.Subtitle>
                        <ListGroup
                            variant="flush"
                            className="flex-grow-1 justify-content-end"
                        >
                            {country.languages ? (
                                <ListGroup.Item>
                                    <i className="bi bi-translate me-2"></i>
                                    {
                                        Object.values(country.languages ?? {})
                                            .join(', ')
                                    }
                                </ListGroup.Item>
                            ) :
                                <ListGroup.Item>
                                    <i className="bi bi-translate me-2"></i>
                                    No language data available for this country
                                </ListGroup.Item>
                            }

                            {country.currencies ? (
                                <ListGroup.Item>
                                    <i className="bi bi-cash-coin me-2"></i>
                                    {Object.values(country.currencies || {})
                                        .map((currency) => currency.name)
                                        .join(', ')
                                    }
                                </ListGroup.Item>
                            ) :
                                <ListGroup.Item>
                                    <i className="bi bi-cash-coin me-2"></i>
                                    No currency data available for this country
                                </ListGroup.Item>

                            }
                            {country.population ? (
                                <ListGroup.Item>
                                    <i className="bi bi-people me-2"></i>
                                    {country.population.toLocaleString()}
                                </ListGroup.Item>
                            ) : <ListGroup.Item>
                                <i className="bi bi-people me-2"></i>
                                No population data available for this country
                            </ListGroup.Item>
                            }

                        </ListGroup>
                    </Card.Body>
                </Card>
            </LinkContainer>
        </Col>

    );
};

export default CountryCard;