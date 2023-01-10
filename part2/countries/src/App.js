import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [allCountry, setAllCountry] = useState([])
  // const [searchInput, setSearchInput] = useState()
  const [searchedCountries, setSearchedCountries] = useState()
  const [oneCountry, setOneCountry] = useState();
  // const [newNumber, setNewNumber] = useState('')


  const searchCountry = (event) => {
    const searchInput = event.target.value;
    let resultsArray = [];
    for (let country of allCountry) {
      if (resultsArray.length > 9) {
        setSearchedCountries("Too many matches, specify another filter");
        break;
      }
      let searchedName = country['name']['common'];
      if (searchedName.toLowerCase().includes(searchInput)) {
        resultsArray = resultsArray.concat(searchedName);
        setSearchedCountries(resultsArray);
      }
    }
    if (resultsArray.length === 1) { setOneCountry(resultsArray[0]) }
  }

  const ShowCountryDetails = () => {
    const obj = allCountry.filter(country => country.name.common === oneCountry)[0];
    console.log('obj', obj);
    let area = obj.area,
      capital = obj.area,
      languages = Object.values(obj.languages),
      flag = obj.flags.svg;
    return (
      <>
        <h2>{oneCountry}</h2>
        <div>capital: {capital}</div>
        <div>area: {area}</div>
        <h3>languages:</h3>
        {languages.map((language) => <li key={language}>{language}</li>)}
        <img alt='flag' src={flag}></img>
      </>
    )
  }

  const PrintResult = ({ results }) => {

    return (results.map((result) => <div key={result}>{result}<button onClick={() => setOneCountry(result)}>show</button></div>));

  }

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled');
        // console.log(response.data)
        setAllCountry(response.data);
      })
  }, [])

  return (
    <div>
      <h1>Find countries and regions</h1>
      <form>
        search: <input onChange={searchCountry}></input>
      </form>
      <h1>Results</h1>
      {!searchedCountries ? "" : typeof searchedCountries === 'string' ? searchedCountries : oneCountry ? <><PrintResult results={searchedCountries} /> <ShowCountryDetails /></> : <PrintResult results={searchedCountries} />}
    </div>
  )
}

export default App