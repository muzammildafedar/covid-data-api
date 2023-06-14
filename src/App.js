import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataDisplay from './components/countryDetails';

const App = () => {
  const [continentsData, setContinents] = useState([]);
  const [searchCountry, setSearchCountry] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [uniqueContinents, setUniqueContinents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    fetchContinentsData();
  }, []);

  const fetchContinentsData = async () => {
    try {
      const response = await axios.get(
        'https://covid-193.p.rapidapi.com/statistics',
        {
          headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': 'ce83fe6c55msh085571d9e67a7c1p1b36fejsn142560be76bc'
          }
        }
      );
      setContinents(response.data.response);
      const temp = [];
      response.data.response.map((data) => {
        if (!temp.includes(data.continent)) {
          temp.push(data.continent);
        }
      });
      const tempfiltered = temp.filter((el) => el != null);
      setUniqueContinents(tempfiltered);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCountrySearch = (event) => {
    event.preventDefault();
    const searchedCountry = event.target.value;
    setSearchCountry(searchedCountry);
    if (searchedCountry) {
      const foundCountry = continentsData.find((continent) =>
        continent.country.toLowerCase().includes(searchedCountry.toLowerCase())
      );
      // console.log('f', foundCountry);
      if (foundCountry) {
        setSearchCountry([foundCountry]);
      } else {
        setSearchCountry("")
      }
    }
  };

  const handleContinentClick = (continent, i) => {
    const temp = [];
    for (let i = 0; i < continentsData.length; i++) {
      if (continentsData[i].continent == continent) {
        temp.push(continentsData[i]);
      }
    }
    setCountryDetails(temp);
    setCurrentIndex(i);
  };
  const resetValue = () => {
    setCountryDetails('');
  }

  return (
    <div className="body" style={{ textAlign: 'center' }}>
      <h1>COVID Reports</h1>
      <input
        type="text"
        placeholder="Search by country"
        onChange={handleCountrySearch}
      />
      {searchCountry.length > 0 ?
        <DataDisplay data={searchCountry} />
        : ""

      }
      <ul>
        {uniqueContinents.map((continent, i) => (
          <div key={continent}>
            <li
              className={`continent-title ${i === currentIndex ? 'active' : ''
                }`}
              onClick={() => countryDetails.length > 0 ? resetValue() : handleContinentClick(continent, i)}
            >
              {continent}
            </li>

            {countryDetails.length > 0 && i === currentIndex ? (
              <div className="data-display">
                <h1>Data Display</h1>
                <DataDisplay data={countryDetails} />
              </div>
            ) : (
              <div className="no-record"></div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
