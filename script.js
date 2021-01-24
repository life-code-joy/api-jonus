'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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
/*
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


*/
// consuming promises 246
// const request = fetch('https://restcountries.eu/rest/v2/name/australia');
// console.log(request);

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

/*
const getCountryData = function (country) {
  //country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;
      //country2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message} Try Again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

getCountryData('cambodia');

btn.addEventListener('click', function () {
  getCountryData('rtt'); // will throw error
});

*/

// coding challenge - where am I
// fetch('https://geocode.xyz/52.508,13.381?json=1')
//   .then(response => response.json())
//   .then(data => console.log(data));

// .then(request => request.json());

//so far it works ok but will copy throw error and catch
/*
const geoC = document.querySelector('.geoCountries');

const whereAmI = function (lat, long) {
  const response = fetch(`https://geocode.xyz/${lat},${long}?json=1`)
    .then(response => response.json()  )
    // .then(data => console.log(`I am in ${data.region} ${data.country}`));
    .then(data => {
      const html = `
      <section style="background-color: #ccc; padding: 2rem">
       <h1 style="color:blue; font-size:2.5rem;" >Hi this is your country and details</h1><br>
       <h2 style="fontStyle:italic">${data.region} ${data.country}  👧🏻👧🏻👧🏻</h2>
       <h3 style="color: white">The elevation is ${data.elevation}</h3>
      </section>
      `;
      console.log(data);
      geoC.insertAdjacentHTML('beforeend', html);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.307, 72.873);
whereAmI(-33.933, 18.474);
*/

//added some css and ouput it - extra for part1
/*
const geoC = document.querySelector('.geoCountries');

const whereAmI = function (lat, long) {
  const response = fetch(`https://geocode.xyz/${lat},${long}?json=1`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      const html = `
      <section style="background-color: #ccc; padding: 2rem">
       <h1 style="color:blue; font-size:2.5rem;" >Hi this is your country and details</h1><br>
       <h2 style="fontStyle:italic">${data.region} ${data.country}  👧🏻👧🏻👧🏻</h2>
       <h3 style="color: white">The elevation is ${data.elevation}</h3>
      </section>
      `;
      console.log(data);
      geoC.insertAdjacentHTML('beforeend', html);
    })
    .catch(err => console.error(`${err.message} 👅 `));
};

whereAmI(52.508, 13.381);
whereAmI(19.307, 72.873);
whereAmI(-33.933, 18.474);
*/
//part 2

const whereAmI = function (lat, long) {
  const response = fetch(`https://geocode.xyz/${lat},${long}?json=1`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city} , ${data.country} `);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // console.log(`You are in ${data.country} `);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.307, 72.873);
whereAmI(-33.933, 18.474);

// promises 253 building a simple promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve('you are a winner!');
  } else {
    reject('You are a big loser!');
  }
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
*/

// create with a set timeout to make asynch

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('A lottery is happening ♣︎');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('you are a winner!');
    } else {
      reject(new Error('You are a big loser!'));
    }
  }, 3000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// example 2 - promisifying setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 1 second');
    return wait(1);
  })
  .then(() => {
    console.log('I waited 2 seconds');
    return wait(2);
  })
  .then(() => {
    console.log('I waited 3 seconds');
    return wait(3);
  })
  .then(() => {
    console.log('I waited 4 seconds');
    return wait(4);
  });
// callback hell changed to promise
/*
setTimeout(() => {
  console.log('1 sec');
  setTimeout(() => {
    console.log('2secs');
    setTimeout(() => {
      console.log('3secs');
      setTimeout(() => {
        console.log('4secs');
      }, 1000);
    }, 2000);
  }, 3000);
}, 4000);

// becomes ... look aboove to the .then chain
*/

Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').catch(x => console.log('shazbot'));
