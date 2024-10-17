// src/pages/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from '../components/CountryList';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    if (loading) return <div>Loading...</div>;

    return <CountryList countries={countries} />;
};

export default Home;
