import React, { useState, useEffect } from 'react';
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
        <div className='bg-white'>
            <h4>Bordering Countries</h4>
            {loading ? (
                <p>Loading...</p>
            ) : errors ? (
                <p>{errors}</p>
            ) : borders.length > 0 ? (
                <div style={{ listStyle: "none" }}>
                    {borders.map((borderCountry) => (
                        <li key={borderCountry.cca3}>
                            <div>
                                <Link
                                    to={`/countries/${borderCountry.name.common}`}
                                    state={{ country: borderCountry }}
                                    style={{ textDecoration: "none", padding: "0 1rem 0 0" }}
                                >
                                    {borderCountry.name.common} {borderCountry.flag}
                                </Link>
                            </div>
                        </li>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default CountryBorders;

