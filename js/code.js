const input_country = document.querySelector("#country");
const input_genre = document.querySelector("#genre");
const button = document.querySelector(".button");
const radio_list = document.querySelector(".radio_list");

const country_list = () => {
  fetch("https://de1.api.radio-browser.info/json/countries/")
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
  fetch("https://de1.api.radio-browser.info/json/stations/bytag/")
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    })
    .then((genres) => {
      const list_genre = document.querySelector(".list_genre");
      genres.forEach((genre) => {
        let option = `<option value="${genre.tags}"</option>`;
        list_genre.insertAdjacentHTML("beforeend", option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};


const getRadioStations = () => {
  const country = input_country.value;
  const genre = input_genre.value;

  fetch(`http://de1.api.radio-browser.info/json/stations/bytag/${genre}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    })
    .then((stations) => {
      radio_list.innerHTML = "";
      stations.forEach((station) => {
        let listItem = document.createElement("li");
        listItem.textContent = station.name;
        listItem.addEventListener("click", () => {
          window.open(`https://en.wikipedia.org/wiki/${station.name}`, "popup", "width=800,height=450");
          let li = `<li class="col-sm col-md"><a href="${station.url}" target="_blank" class="col-sm col-md">Воспроизвести  - ${station.name}</a></li>`;
          radio_list.insertAdjacentHTML("beforeend", li);
        });
        radio_list.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  country_list();
  genre_list();

  button.addEventListener("click", getRadioStations);
});
