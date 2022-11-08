import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from "./fetchCountries"
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector(`.country-list`);
//const countryInfo = document.querySelector(`.country-list`);

const searchBox = document.querySelector(`input#search-box`)
//console.log(searchBox);
    
const onHandleInput = event => {
  const inputValue = event.target.value.trim();
        
  if (inputValue) handleInput(inputValue);
  else (
    countryList.innerHTML = ` `
  )      
};

searchBox.addEventListener(`input`, debounce(onHandleInput, DEBOUNCE_DELAY));
    
function handleInput (value) {
                fetchCountries(value)
                    .then(countries => {
                if (countries.length > 10) {
                    Notiflix.Notify.failure(`Too many matches found. Please enter a more specific name.`);
                }
                else if (countries.length <= 10 && countries.length >= 2) {
                    displayCountriesInfo(countries)
                } else {
                    displayCountryInfo(countries)
                    }
                    })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(`Oops, there is no country with that name`)
  })      
};

function displayCountryInfo(countries) {
        const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="30" hight="20">
            <b>${country.name.official}</b>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
        })
        .join('');
      countryList.innerHTML = markup;   
};

function displayCountriesInfo(countries) {
    //console.log(`countries`, countries); 
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" height="20">
        <b>${country.name.official}</b>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
};