// frontend/pages/country/[countryCode].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (countryCode) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/countries/${countryCode}`
          );
          setCountry(response.data);
        } catch (error) {
          console.error("Error fetching country:", error);
        }
      };

      fetchCountry();
    }
  }, [countryCode]);

  if (!country) return <p>Loading...</p>;

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
    </div>
  );
};

export default CountryInfo;
