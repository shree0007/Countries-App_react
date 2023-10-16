import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


const CountryBorders = () => {

    const location = useLocation();
    const country = location.state.country;

    const [loading, setLoading] = useState(true);
    const [borders, setBorders] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (country.borders.length > 0) {
            const fetchBorderData = async () => {
                try {
                    const apiUrl = "https://restcountries.com/v3.1/";
                    const response = await axios.get(`${apiUrl}alpha?codes=${country.borders.join(",")}`);
                    setBorders(response.data);
                }
                catch (error) {
                    setErrors("An error occurred while fetching data. Please try again later.");
                }

                finally {
                    setLoading(false);
                }

            };
            fetchBorderData();
        }
    }, [country.borders]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>Borders</Card.Title>
                {errors ? (
                    <p>{errors}</p>
                ) : borders.length > 0 ? (
                    <div style={{ display: "flex", listStyle: "none" }}>
                        {borders.map((country) => (
                            <li key={country.cca3}>
                                <div>
                                    <Link
                                        to={`/countries/${country.name.common}`}
                                        state={{ country: country }}
                                        style={{ textDecoration: "none", padding: "0 1rem 0 0" }}
                                    >
                                        {country.name.common}{country.flag}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </div>
                ) : null
                }
            </Card.Body>
        </Card>
    )
}

export default CountryBorders;

