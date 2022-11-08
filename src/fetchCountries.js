import Notiflix from "notiflix";

export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
         .then(response => {
    if (!response.ok) {
      throw new Error(Notiflix.Notify.failure(`Oops, there is no country with that name`));
    }
    return response.json();
  })
}

//.then if response.length > 10 {
//Notiflix.Notify("Too many matches found. Please enter a more specific name.")
//}).then reurn fetch((`https://restcountries.com/v3.1/name/{name}`))



