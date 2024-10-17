// frontend/src/components/CountryList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./CountryList.module.css";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sortOrder, setSortOrder] = useState('A-Z');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/countries/available");
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (/[^a-zA-Z\s]/.test(term)) {
      setErrorMessage('Solo se permiten letras.');
      setFilteredCountries([]);
    } else {
      setErrorMessage('');
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
    setCurrentPage(1);
  };

  const handleSort = (order) => {
    const sorted = [...filteredCountries].sort((a, b) =>
      order === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFilteredCountries(sorted);
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Countries</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar país..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {filteredCountries.length === 0 && !errorMessage && (
          <p className={styles.noResults}>No se encontró ningún país.</p>
        )}
      </div>

      <div className={styles.sortButtons}>
        <button
          onClick={() => handleSort('A-Z')}
          className={`${styles.sortButton} ${sortOrder === 'A-Z' ? styles.active : ''}`}
        >
          A-Z
        </button>
        <button
          onClick={() => handleSort('Z-A')}
          className={`${styles.sortButton} ${sortOrder === 'Z-A' ? styles.active : ''}`}
        >
          Z-A
        </button>
      </div>

      <ul className={styles.countryList}>
        {currentCountries.map((country) => (
          <li key={country.countryCode} className={styles.countryItem}>
            <Link href={`/country/${country.countryCode}`} className={styles.link}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button
          className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Previous
        </button>
        <span className={styles.pageInfo}>Página {currentPage} de {totalPages}</span>
        <button
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default CountryList;
