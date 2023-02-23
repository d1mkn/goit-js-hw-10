import Notiflix from 'notiflix';

async function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name';
  const searchParams = 'name,capital,population,flags,languages';
  const response = await fetch(`${url}/${name}?fields=${searchParams}`);
  const country = await response.json();
  if (response.status !== 200) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
  return country;
}

export { fetchCountries };
