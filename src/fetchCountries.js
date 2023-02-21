import Notiflix from 'notiflix';

function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name';
  const searchParams = 'name,capital,population,flags,languages';

  return fetch(`${url}/${name}?fields=${searchParams}`)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}

export { fetchCountries };
