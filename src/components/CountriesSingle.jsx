import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Row, Col, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import Row from 'react-bootstrap';
// import Col from 'react-bootstrap';

const CountriesSingle = () => {

  //function hooks
  const location = useLocation();
  const navigate = useNavigate();

  //state hooks
  const [weather, setWeather] = useState('');
  const [errors, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //Destructuring variables
  const country = location.state.country;

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
      .catch((err) => {
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      })

  }, [country.capital])

  console.log("Weather: ", weather);

  if (loading) {
    return (
      <Container>
        <Spinner
          animation='border'
          role='status'
          className='center'
          variant='info'>
          <span className='visually-hidden'>Loading.....</span>
        </Spinner>
      </Container>
    )
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <Image thumbnail src={`http://source.unsplash.com/1600x900/?${country.capital}`} />
        </Col>

        <Col>
          <h2 className='display-4'>{country.name.common}</h2>
          <h3>{country.capital}</h3>
          {!errors && weather && (

            <div>
              <p>
                Right now it is <strong>{parseInt(weather.main.temp)}</strong>degrees in {country.capital} and {weather.weather[0].description}
              </p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />

            </div>
          )}

        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='light' onClick={() => navigate('/countries')}>
            Back to Countries
          </Button>
        </Col>
      </Row>

    </Container>
  );
};

export default CountriesSingle;
