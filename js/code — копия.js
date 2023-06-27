const input_country = document.querySelector("#country");
const input_genre = document.querySelector("#genre");
const button = document.querySelector("button");
const list = document.querySelector('.list');

const getStations = () => {
  const country = input_country.value;
  const genre = input_genre.value;


  fetch(`http://de1.api.radio-browser.info/json/stations/bycountryexact/${country}/bytagexact/${genre}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    })
    .then((stations) => {
      list.innerHTML = '';
      stations.forEach((station) => {
        const item = 
        `<li>
            <a href="${station.url}" target="_blank">${station.name}</a>
          </li>`
        ;
        list.insertAdjacentHTML('beforeend', item);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const country_list = () => {
  fetch(`http://de1.api.radio-browser.info/json/countries/`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    })
    .then((countries) => {
      const list_country = document.querySelector(".list_country");
      countries.forEach((country) => {
        let option = `<option value="${country.iso_3166_1}">${country.name}</option>`;
        list_country.insertAdjacentHTML("beforeend", option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

 
              
         
const genre_list = () => {
  fetch(`http://de1.api.radio-browser.info/json/tags`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    })
    .then((genres) => {
      const list_genre = document.querySelector(".list_genre");
      genres.forEach((genre) => {
        let option = `<option value="${genre.name}">${genre.name}</option>`;
        list_genre.insertAdjacentHTML("beforeend", option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  country_list();
  genre_list();
});

button.addEventListener("click", getStations()); 

  