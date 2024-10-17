// frontend/src/components/CountryList.js
import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import Link from "next/link";

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/countries/available"
        );
        setCountries(response.data);
      } catch (error) {
        console.error(
          "Error fetching countries:",
          error
        );
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Available Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link
              href={`/country/${country.countryCode}`}
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
