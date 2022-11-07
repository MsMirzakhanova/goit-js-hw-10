import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from "./fetchCountries"
//import debounce from 'lodash/debounce';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector(`.country-list`);
//const countryInfo = document.querySelector(`.country-list`);

searchBox = document.querySelector(`#search-box`)
//console.log(searchBox);

searchBox.addEventListener(
    "input", (event) => {
        const inputValue = event.target.value.trim();
        
        if (inputValue) handleInput(inputValue);
        else (
            countryList.innerHTML = ` `
        )
        
});
    
function handleInput (value) {
            setTimeout(() => {
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
                    }
                ).then(error => {
                    if (!Response.ok) {
                      throw new error (Notiflix.Notify.failure(`Oops, there is no country with that name`));
                    }
                })
                    .catch(error => {
                      console.log(error); 
                    }) 
        }, DEBOUNCE_DELAY);
}

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