const input_country = document.querySelector('#country');
const selection_Genre = document.querySelector('#genre');
const Button = document.querySelector('#button');
const list_station = document.querySelector('#list_station');
const buttonBack = document.querySelector('#button_back');

async function country_and_genre(strana) {
  try {
    const response = await fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${strana}`);
    if (!response.ok) {
      throw new Error('Сетевая ошибка');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    return [];
  }
}

const genres = ['classical', 'blues', 'hiphop', 'pop', 'rock', 'jazz', 'hip hop', 'trap', 'pasillo', 'R&B', 'trance', 'house', 'metal', 'pank', 'rap', 'kpop'];
genres.forEach(genre => {
  const option = document.createElement('option');
  option.value = genre;
  option.textContent = genre;
  selection_Genre.appendChild(option);
});


let correspondingStations = [];

Button.addEventListener('click', async () => {
  const country = input_country.value.trim();
  const genre = selection_Genre.value.trim();
  const stations = await country_and_genre(country);
  
  correspondingStations = stations.filter(station => station.tags.includes(genre));
  
  if (correspondingStations.length === 0) {
    list_station.textContent = `В ${country} нет станций с ${genre}`;  
    return;
  }
  buttonBack.addEventListener('click', () => {
    input_country.value = '';
    selection_Genre.value = '';
    list_station.innerHTML = '';
    if (selection_Genre.value === ''){
      let option2 = `<option selected disabled hidden>Выберите cнова!</option>`
      selection_Genre.insertAdjacentHTML("beforeend", option2);
    }
  });
      
  list_station.innerHTML = '';

  correspondingStations.forEach(station => {
    const station_linkes = document.createElement('a');
    station_linkes.href = station.homepage;
    if (station.homepage === '') {
      station_linkes.href = station.url 
    }
      station_linkes.target = '_blank';
    station_linkes.textContent = station.name;
    station_linkes.addEventListener('click', () => {
      window.open(`https://en.wikipedia.org/wiki/${station.name}`, "popup", "width=800,height=450");
    });
    const Items_list = document.createElement('li');
    Items_list.appendChild(station_linkes);
    list_station.appendChild(Items_list);
  });
 
});



document.addEventListener("DOMContentLoaded", () => {
  fetch("https://de1.api.radio-browser.info/json/countries/")
    .then((response) => {
      if (!response.ok)
        throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    })
    .then((countries) => {
      const input_country = document.querySelector(".list_country");
      countries.forEach((country) => {
        let option = `<option value="${country.iso_3166_1}">${country.name}</option>`;
        input_country.insertAdjacentHTML("beforeend", option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});


