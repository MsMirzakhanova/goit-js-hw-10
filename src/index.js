import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from "./fetchCountries"
//import debounce from 'lodash/debounce';

const DEBOUNCE_DELAY = 300;


searchBox = document.querySelector(`input#search-box`)
console.log(searchBox);

searchBox.addEventListener(
    "input", (event) => {
        const inputValue = event.target.value.trim();
        
        if (inputValue) handleInput(inputValue);
        
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
                    displayCountryInfo(countries[0])
                    }
                    }
                )
                    .catch(error => {
                      Notiflix.Notify.error(`Oops, there is no country with that name.`);  
                    }) 
        }, DEBOUNCE_DELAY);
}

function displayCountryInfo(country) {

 console.log(`country`,country);   
};

function displayCountriesInfo(countries) {
    console.log(`countries`, countries); 
    const countryList = document.querySelector(`.country-list`);
    countries.forEach(country => {
        const li = document.createElement(`li`)  
        const span = document.createElement(`span`)
        span.innerHTML = country.name.official;
        const img = document.createElement(`img`)
        img.src = country.flags.svg
        
        li.append(span, img);
        //console.log(li);
        countryList.append(li);

    });
};