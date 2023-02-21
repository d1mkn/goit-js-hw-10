import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const refs = {
  input: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

function onInput(e) {
  const countryName = e.target.value.trim();
  if (countryName === '') {
    clear();
    return;
  }

  fetchCountries(countryName).then(data => {
    toManyData(data);
    renderListMarkup(data);
    renderCountryInfo(data);
  });
}

function toManyData(data) {
  if (data.length >= 10) {
    clear();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return data;
  }
}

function renderListMarkup(data) {
  if (data.length <= 10) {
    clear();
    return data.map(({ name, flags }) => {
      refs.countryList.insertAdjacentHTML(
        'beforeend',
        `<li><img src=${flags.svg} width="60" height="40">${name.official}</li>`
      );
    });
  }
}

function renderCountryInfo(data) {
  if (data.length === 1) {
    clear();
    return data.map(({ name, flags, capital, population, languages }) => {
      refs.countryInfo.insertAdjacentHTML(
        'beforeend',
        `<span><img src=${flags.svg} width="50" height="30" /><h2>${
          name.official
        }</h2></span>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages)}</p>`
      );
    });
  }
}

function clear() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
