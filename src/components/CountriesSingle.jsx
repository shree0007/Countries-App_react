import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Row, Col, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountryBorders from './CountryBorders';


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
    if (!country.capital) {
      setLoading(false)
      setError(true)
    } else {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
        .catch((err) => {
          setError(true);
        })
        .then((res) => {
          setWeather(res.data);
          setLoading(false);
        })
    }

  }, [country.capital])

  console.log("Weather: ", weather);

  if (loading) {
    return (
      <Container className='min-vh-100'>
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
    <Container className='bg-#191919 vh-100'>
      <Row className="mt-5 mr-2">
        <Col className='h-40'>
          <Image thumbnail src={`http://source.unsplash.com/1600x900/?${country.capital}`} />
        </Col>

        <Col className='h-40 flex'>
          <div style={{ backgroundColor: "#290001", padding: "4rem", color: "white", height: "100%" }}>
            <h2 className='display-4'>{country.name.common}{" " + country.flag}</h2><br />
            <p><span style={{ color: "#308454" }}>{country.capital}</span> is the capital city of {country.name.common}</p>
            <p>{country.name.common} has area of <span style={{ color: "#308454" }}>{country.area.toLocaleString()}</span> sq.km</p>
            <p>Is {country.name.common} a land-locked? <span style={{ color: "#308454", fontWeight: "600" }}>{country.landlocked.toLocaleString()}</span></p>
            <p>Is {country.name.common} a UN member? <span style={{ color: "#308454", fontWeight: "600" }}>{country.unMember.toLocaleString()}</span></p>
            {errors && (
              <p>Sorry, we don't have weather information for this country</p>
            )}
            {!errors && weather && (

              <div>
                <p>
                  Right now it is <strong style={{ color: "#308454" }}>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and the weather is {weather.weather[0].description}
                </p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />

              </div>

            )}
          </div>
        </Col>

        <CountryBorders />

      </Row>
      <Row style={{ marginTop: "5rem" }}>
        <Col>
          <Button variant='success' onClick={() => navigate('/countries')}>
            Back to Countries
          </Button>
        </Col>
      </Row>

    </Container>
  );
};

export default CountriesSingle;
