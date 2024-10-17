// frontend/src/components/CountryInfo.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const CountryInfo = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  console.log
  useEffect(() => {
    const fetchCountryInfo = async () => {
      const response = await axios.get("http://localhost:5000/api/countries/available");
      setCountryInfo(response.data);
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (!countryInfo) return <p>Loading...</p>;

  const populationData = {
    labels: countryInfo.population.map(p => p.year),
    datasets: [
      {
        label: 'Population',
        data: countryInfo.population.map(p => p.value),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  return (
    <div>
      <h1>{countryInfo.commonName}</h1>
      <img src={countryInfo.flag} alt={`${countryInfo.commonName} flag`} />
      <h2>Border Countries:</h2>
      <ul>
        {countryInfo.borders.map(border => (
          <li key={border.countryCode}>
            <Link to={`/country/${border.countryCode}`}>{border.commonName}</Link>
          </li>
        ))}
      </ul>
      <h2>Population Over Years:</h2>
      <Line data={populationData} />
    </div>
  );
};

export default CountryInfo;
