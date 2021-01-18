'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const request = new XMLHttpRequest();

request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal');

request.send();

console.log(request.responseText);
request.addEventListener('load', function () {
  // console.log(this.responseText);
  // const data = JSON.parse(this.responseText)[0];
  const [data] = JSON.parse(this.responseText);
  console.log(data);
  let html;
  html += `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed()}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>  
  </div>
</article>


`;
  countriesContainer.insertAdjacentElement('beforeend', html);
  countriesContainer.style.opacity = 1;
});
