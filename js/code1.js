const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", async function () {
  //Добавление обработчика click на кнопку button с помощью метода addEventListener, который вызывает ассинхроную функцию
  const strana_str = input.value; //strana_str и присвоение ей значения из поля ввода input.
  const data = await krData(strana_str); //Вызов функции krData и получение значения из поля ввода input и передача его в функцию krData с помощью await.
  const maxClickCountStation = MaxClickCount(data); //Получение объекта data из функции krData и передача его в функцию MaxClickCount для поиска радиостанции с наибольшим количеством кликов. (35, 42)
  try {
    if (maxClickCountStation) {
      // Попытка в блоке try.Если значение maxClickCountStation не равно null, то открывается новое окно браузера с url'ом из свойства homepage объекта maxClickCountStation.
      window.open(maxClickCountStation.homepage);
      const newWindow = window.open("/", "example", "width=600,height=400");
      newWindow.onload = function () {
        //Добавление метода onload на новое окно, который вызывает функцию.
        newWindow.document.write(
          `Радиостанция: ${maxClickCountStation.name} <br \/>ClickCount: ${maxClickCountStation.clickcount} `
        );
        const img = newWindow.document.createElement("img");
        img.classList.add("kartina");
        img.src = maxClickCountStation.favicon;
        img.width = 80;
        img.height = 80;
        img.style.position = "absolute";
        img.style.top = "50";
        img.style.left = "10";
        newWindow.document.body.appendChild(img);
      };
    } else {
      alert(
        `В стране "${strana_str}" нет радиостанций\nИли \nВы ввели число. `
      ); //Если значение maxClickCountStation равно null, то выводится сообщение об отсутствии радиостанций в указанной стране
    }
  } catch (error) {
    //В случае возникновения ошибки выводится сообщение об ошибке загрузки данных
    console.error(error); //для перехвата ошибок при выполнении запроса к API.
    alert(`Ошибка загрузки данных.`);
  }
});

async function krData(strana_str) {
  //Объявление ассинхроной функции krData, которая получает данные о радиостанциях в определенной стране с помощью api fetch и возвращает объект station.
  const response = await fetch(
    `http://de1.api.radio-browser.info/json/stations/bycountry/${strana_str}`
  );
  const station = await response.json(); //Полученные данные преобразуются в формат JSON и возвращаются из функции (37,38)
  return station;
}

function MaxClickCount(data) {
  //Создание функции MaxClickCount, которая принимает объект station и возвращает объект радиостанции с наибольшим количеством кликов.
  let maxClickCount = 0;
  let maxClickCountStation = null;
  for (const station of data) {
    if (station.clickcount > maxClickCount) {
      maxClickCount = station.clickcount;
      maxClickCountStation = station;
    }
  } //Возвращение найденной радиостанции в виде объекта. Если радиостанция не имеет кликов, возвращение null
  return maxClickCountStation;
}

krData("").then((station) => {
  console.log(station);
});
console.log(krData("Russian"));














const input_country = document.querySelector("#country"); 
const input_genre = document.querySelector("#genre"); 
const button = document.querySelector(".button");
const radio_list = document.querySelector(".radio_list");

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
        let option = `<option value="${genre.name}"</option>`;
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

button.addEventListener('click', function() {
const country = input_country.value;  
const genre = input_genre.value;
  getRadioList(country, genre);
})

const getRadioList = (country, genre) => {
  fetch(`http://de1.api.radio-browser.info/json/stations/search?country=${country}&tag=${genre}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok)
        throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    })
    .then((stations) => {
      radio_list.innerHTML = "";
      stations.forEach((station) => {
        const stationElement = document.createElement("li");
        stationElement.innerText = station.name;
        stationElement.addEventListener('click', () => {
          window.open(station.url);
        })
        radio_list.appendChild(stationElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
  