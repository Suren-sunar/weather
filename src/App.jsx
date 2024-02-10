import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [temperatureCelsius, setTemperatureCelsius] = useState("");
  const [temperatureFah, setTemperatureFah] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");
  const [currentdate, setCurrentDate] = useState(new Date());
  const [weatherIcon, setWeatherIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const defaultLocation = "Earth";

  const handleSearch = async (event) => {
    setLoading(true);

    let apiUrl;
    if (!location.trim()) {
      setData('')
      setTemperatureCelsius('')
      setWeatherIcon('')
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=b3f2844c90f8839c89b19a3852a95bc6`;
    } else {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b3f2844c90f8839c89b19a3852a95bc6`;
    }

    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setTemperatureCelsius(response.data.main.temp);
      // setTemperatureFah(response.data.main.temp * (9 / 5) + 32);
      setWeatherIcon(response.data.weather[0].icon);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [location]);

  return (
    <>
      <form>
        <div className="col-12">
          <input
            type="text"
            placeholder="Enter City"
            id="city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {loading && <p>Loading...</p>}

          {data.name && (
            <h2 className="loc">
              {data.name} {data.sys.country}
            </h2>
          )}
          {weatherIcon && (
            <img
              src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
          )}
          {data.weather ? (
            <h2>{`${data.weather[0].description}`}</h2>
          ) : (
            <h1></h1>
          )}
          {data.main ? (
            <h2 className="temp">{`  ${temperatureCelsius} °C`}</h2>
          ) : (
            <h1></h1>
          )}
          
            
          <div className="title">
            <p className="hwind">Wind</p>
            <p className="hpress">Pressure</p>
            <p className="hhumi">Humidity</p>
          </div>
            <div className="dis">
          {data.main ? (
            <p className="wind">{` ${data.wind.speed} km/hr`}</p>
          ) : (
            <h1></h1>
          )}
          {data.main && data.main.pressure && (
            <p className="press">{` ${data.main.pressure} hPa`}</p>
          )}
          {data.main ? (
            <p className="humi">{`${data.main.humidity}%`}</p>
          ) : (
            <h1></h1>
          )}
    </div>
          <h5 className="date">{`Date: ${currentdate.toDateString()}  `}</h5>
        </div>
      </form>
    </>
  );
};

export default App;
