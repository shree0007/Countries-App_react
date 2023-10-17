import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountryBorders from './CountryBorders';


const CountriesSingle = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [weather, setWeather] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const country = location.state.country;

  useEffect(() => {
    if (!country.capital) {
      setLoading(false)
      setErrors(true)
    } else {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
        .catch((err) => {
          setErrors(true);
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
    <Container className='min-vh-100 mt-2'>
      <div className="row p-2">

        <div className="col-8 p-0">
          <Image style={{ width: "100%", height: "100%" }} src={`http://source.unsplash.com/1600x900/?${country.capital}`} />
        </div>

        <div className="col-4 bg-white p-4">
          <h2 className='display-4'>{country.name.common}{" " + country.flag}</h2><br />
          <h4>Basic Info</h4>
          <p><span style={{ color: "#308454", fontWeight: "600" }}>{country.capital}</span> is the capital city of {country.name.common}</p>
          <p>{country.name.common} has area of <span style={{ color: "#308454", fontWeight: "600" }}>{country.area.toLocaleString()}</span> sq.km</p>
          <p>Is {country.name.common} a land-locked? <span style={{ color: "#308454", fontWeight: "600" }}>{country.landlocked.toLocaleString()}</span></p>
          <p>Is {country.name.common} a UN member? <span style={{ color: "#308454", fontWeight: "600" }}>{country.unMember.toLocaleString()}</span></p>
        </div>

        <div className="w-100 p-2"></div>

        <div className="col bg-white p-4 h-auto">

          <CountryBorders /> <br />

          <div style={{ marginTop: "1rem" }}>
            <h4>Country's Google Map</h4>
            <a style={{ border: "2px solid green", borderRadius: "4px", padding: "0.3rem", textDecoration: "none", color: "green" }} href={country.maps.googleMaps} alt={country.name.common} target="_blank" rel="noreferrer">Click here</a>
          </div>
        </div>

        <div className="col p-4 bg-white">
          {errors && (
            <p>Sorry, we don't have weather information for this country</p>
          )}
          {!errors && weather && (

            <div>
              <h4>Weather Info</h4>
              <p>
                Right now it is <strong style={{ color: "#308454" }}>{parseInt(weather.main.temp)} °C</strong> in {country.capital} and the weather is <strong style={{ color: "#308454" }}>{weather.weather[0].description}</strong>
              </p>
              <p>Feels Like temperature is:  <strong style={{ color: "#308454" }}>{weather.main.feels_like}°C</strong></p>
              <p>Humidity is <strong style={{ color: "#308454" }}>{weather.main.humidity}%</strong >, and wind speed is <strong style={{ color: "#308454" }}>{weather.wind.speed}m/s</strong> and wind degree is <strong style={{ color: "#308454" }}>{weather.wind.deg} degrees</strong> </p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />

            </div>

          )}
        </div>

        <div className='my-4 d-flex justify-content-center align-items-center'>
          <Button variant='success' onClick={() => navigate('/countries')}>
            Back to Countries
          </Button>

        </div>

      </div>
    </Container>

  );
};

export default CountriesSingle;
