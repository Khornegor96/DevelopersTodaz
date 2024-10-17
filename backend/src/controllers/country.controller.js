const axios = require("axios");
//a
const getAvailableCountries = async (
  req,
  res
) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

const getCountryFlags = async (req, res) => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );

    // Devolvemos los datos obtenidos en la respuesta
    res.json(response.data);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y el mensaje del error
    res
      .status(500)
      .json({ message: error.message });
  }
};

const getCountryPopulation = async (req, res) => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/population"
    );

    // Devolvemos los datos obtenidos en la respuesta
    res.json(response.data);
  } catch (error) {
    // En caso de error, respondemos con un estado 500 y el mensaje del error
    res
      .status(500)
      .json({ message: error.message });
  }
};

const getCountryInfo = async (req, res) => {
  const { countryCode } = req.params;

  try {
    // Petición para obtener la información básica del país
    const { data: borderCountries } =
      await axios.get(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
      );

    // Obtener banderas y poblaciones en paralelo
    const [flagResponse, populationResponse] =
      await Promise.all([
        axios.get(
          "https://countriesnow.space/api/v0.1/countries/flag/images"
        ),
        axios.get(
          "https://countriesnow.space/api/v0.1/countries/population"
        ),
      ]);

    // Extraer los datos relevantes
    const flags = flagResponse.data.data || [];
    const populations =
      populationResponse.data.data || [];

    // Buscar la bandera utilizando el nombre del país
    const countryFlag =
      flags.find(
        (c) =>
          c.name === borderCountries.commonName
      )?.flag || "No flag available";

    // Buscar la población del país utilizando el nombre del país
    const populationInfo = populations.find(
      (c) =>
        c.country === borderCountries.commonName
    )?.populationCounts || [
      { year: "No data", value: "No data" },
    ];

    // Construir la respuesta con toda la información
    const countryInfo = {
      ...borderCountries,
      flag: countryFlag,
      population: populationInfo,
    };

    res.json(countryInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

module.exports = { getCountryInfo };
module.exports = {
  getAvailableCountries,
  getCountryInfo,
  getCountryFlags,
  getCountryPopulation,
};
