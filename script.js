'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
// xmlHttpequest
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

  request.send();

  console.log(request.responseText);

  request.addEventListener('load', function () {
    // console.log(this.responseText);
    // const data = JSON.parse(this.responseText)[0];
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>  
  </div>
</article>


`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.innerHTML = html;
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('usa');
getCountryData('portugal');
getCountryData('canada');

*/

// callback hell
//added a className as parameter and the in the template - jonus made a css class for the neighbor country
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}" >
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>  
  </div>
</article>


`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.innerHTML = html;
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  console.log(request.responseText);
  request.addEventListener('load', function () {
    // console.log(this.responseText);
    // const data = JSON.parse(this.responseText)[0];
    const [data] = JSON.parse(this.responseText);
    //render country 1
    renderCountry(data);

    //get neighbor country (2)
    const [neighbor] = data.borders;
    //some countries don't have borders so return immediately
    if (!neighbor) return;

    //ajax call 2
    const request2 = new XMLHttpRequest();
    // in the url string we changed the ...v2/NAME/&{country}  to ... v2/ALPHA/${NEIGHBOUR}
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('russia');

// consuming promises 246
const request = fetch('https://restcountries.eu/rest/v2/name/australia');
console.log(request);

// now to organise into a function
/*
const getCountryData = function(country){
  fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(response){
  console.log(response);
  return response.json();
  }).then(function(data){
    console.log(data[0]);
    renderCountry(data[0])
    
  })
}

getCountryData('monaco');
*/

// simplified code from above
const getCountryData = function(country){
  //country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders[0];

    if(!neighbour) return;
    //country2
    return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
  })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
  }

  getCountryData('portugal')