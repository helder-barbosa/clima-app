let weather = {
  APIkey: process.env.API_KEY,

  fetchWeather: function (nameCity) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        nameCity +
        '&appid=' +
        this.APIkey +
        '&units=metric&lang=pt_br'
    )
      .then((response) => {
        if (!response.ok) {
          alert('Dados não encontrados.');
          throw new Error('No weather found.');
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector('.city').innerHTML = 'Clima em ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.icon').alt = description;
    document.querySelector('.description').innerHTML = description;
    document.querySelector('.temp').innerHTML = Math.trunc(temp) + ' °C';
    document.querySelector('.humidity').innerHTML =
      'Umidade: ' + humidity + ' %';
    document.querySelector('.wind').innerHTML =
      'Veloc. do Vento: ' + Math.trunc(speed) + ' m/s';
    document.querySelector('.weather').classList.remove('loading');
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (evt) {
  if (evt.key == 'Enter') {
    weather.search();
  }
});

weather.fetchWeather('Sao Paulo');
