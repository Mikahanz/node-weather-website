//console.log('Client side js file is loaded!');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temp');
const feelslikeElement = document.querySelector('#feelslike');
const forecastElement = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  axios({
    method: 'get',
    url: `http://localhost:3000/weather?address=${searchElement.value}`,
    responseType: 'json',
  })
    .then((res) => {
      if (!res.data.error) {
        const { Location, Temperature, FeelsLike, forecast } = res.data;

        console.log(res.data);
        cityElement.textContent = Location;
        tempElement.textContent = Temperature;
        feelslikeElement.textContent = FeelsLike;
        forecastElement.textContent = forecast;
      } else {
        cityElement.textContent = res.data.error;
      }
    })
    .catch((err) => {
      cityElement.textContent = err.data;
    });
});
