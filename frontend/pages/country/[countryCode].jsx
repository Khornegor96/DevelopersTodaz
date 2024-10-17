// frontend/pages/country/[countryCode].js
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";
import Chart from 'chart.js/auto';
import styles from "./CountryInfo.module.css"; // Importa el CSS

const CountryInfo = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [country, setCountry] = useState(null);
  const chartRef = useRef(null); // Referencia al canvas del gráfico

  useEffect(() => {
    if (countryCode) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/countries/${countryCode}`
          );
          setCountry(response.data);
        } catch (error) {
          console.error(
            "Error fetching country:",
            error
          );
        }
      };

      fetchCountry();
    }
  }, [countryCode]);

  useEffect(() => {
    if (
      country &&
      country.population &&
      chartRef.current
    ) {
      const ctx =
        chartRef.current.getContext("2d");
      const years = country.population.map(
        (p) => p.year
      );
      const values = country.population.map(
        (p) => p.value
      );

      new Chart(ctx, {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              label: "Población",
              data: values,
              borderColor:
                "rgba(75, 192, 192, 1)",
              backgroundColor:
                "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [country]); // Vuelve a renderizar el gráfico si cambian los datos

  if (!country) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>{country.commonName}</h1>
      <p>Region: {country.region}</p>

      {/* Mostrar la bandera */}
      <img
        src={country.flag}
        alt={`Flag of ${country.commonName}`}
        className={styles.flag}
      />

      {/* Mostrar países limítrofes */}
      <h2>Países Limítrofes:</h2>
      {country.borders &&
      country.borders.length > 0 ? (
        <ul className={styles.bordersList}>
          {country.borders.map(
            (border, index) => (
              <li key={index}>
                {border.commonName} (
                {border.officialName})
              </li>
            )
          )}
        </ul>
      ) : (
        <p>No tiene países limítrofes.</p>
      )}

      {/* Gráfico de población */}
      <h2>Población a lo largo de los años:</h2>
      <canvas
        ref={chartRef}
        className={styles.chart}
      ></canvas>
    </div>
  );
};

export default CountryInfo;
