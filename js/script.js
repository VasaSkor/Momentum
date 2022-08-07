let randomNum = Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0')
let slideNext = document.querySelector('.slide-next')
let slidePreview = document.querySelector('.slide-prev')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const windSpeed = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const cityInput = document.querySelector('.city')
cityInput.value = 'Minsk'
const weatherError = document.querySelector('.weather-error')
const quoteText = document.querySelector('.quote')
const quoteAuthor = document.querySelector('.author')
const quoteChangeButton = document.querySelector('.change-quote')
let quotes = ''

function showTime() {
    const time = document.querySelector('.time')
    const date = new Date()
    const currentTime = date.toLocaleTimeString()
    time.textContent = currentTime
    setTimeout(showTime, 1000);
    return time
  }

function showDate(){
  const date_block = document.querySelector('.date')
  const date = new Date()
  const options = {weekday: 'long', month: 'long', day: 'numeric'}
  const currentDate = date.toLocaleDateString('en-US', options);
  date_block.textContent = currentDate
  setTimeout(showDate, 1000);
  return date_block
}

function showGreetings(){
  const greetings = document.querySelector('.greeting')
  const arrGreetings = ['morning', 'afternoon', 'evening', 'night']
  const date = new Date()
  const GetHours = date.getHours()
  setTimeout(showGreetings, 1000);
  if(GetHours >= 6 && GetHours <= 11){
   return greetings.textContent = `Good ${arrGreetings[0]}`
  }
  else if(GetHours >= 12 && GetHours <= 17){
    return greetings.textContent = `Good ${arrGreetings[1]}`
  }
  else if(GetHours >= 18 && GetHours <= 23){
    return greetings.textContent = `Good ${arrGreetings[2]}`
  }
  else if(GetHours >= 0 && GetHours <= 5){
    return greetings.textContent = `Good ${arrGreetings[3]}`
  }
}

function setLocalStorage() {
  const name = document.querySelector('.name')
  localStorage.setItem('name', name.value);
}

function getLocalStorage() {
  const name = document.querySelector('.name')
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}

const getRandomBackgroundImage = () => {
const date = new Date()
const GetHours = date.getHours()
const image = new Image()
let index = randomNum.toString().padStart(2, '0')
if(GetHours >= 6 && GetHours <= 11){
image.src = `https://raw.githubusercontent.com/VasaSkor/Momentum_background/assets/images/morning/${index}.jpg`
image.onload = () =>
    document.querySelector('body').style.backgroundImage = `url(${image.src})`
}
else if(GetHours >= 12 && GetHours <= 17){
  image.src = `https://raw.githubusercontent.com/VasaSkor/Momentum_background/assets/images/afternoon/${index}.jpg`
    image.onload = () =>
        document.querySelector('body').style.backgroundImage = `url(${image.src})`
}
else if(GetHours >= 18 && GetHours <= 23){
  image.src = `https://raw.githubusercontent.com/VasaSkor/Momentum_background/assets/images/evening/${index}.jpg`
    image.onload = () =>
        document.querySelector('body').style.backgroundImage = `url(${image.src})`
}
else if(GetHours >= 0 && GetHours <= 5){
  image.src = `https://raw.githubusercontent.com/VasaSkor/Momentum_background/assets/images/night/${index}.jpg`
    image.onload = () =>
        document.querySelector('body').style.backgroundImage = `url(${image.src})`
}
}

const getSlideNext = () =>{
  randomNum++
  if (randomNum > 20)
    randomNum = 1
    getRandomBackgroundImage()
}
const getSlidePrev = () =>{
  randomNum--
  if(randomNum < 1)
     randomNum = 20
     getRandomBackgroundImage()
}

cityInput.onkeypress = async (event) => {
  if(!event)
      event = window.event

  if (event.key === 'Enter')
  {
      cityInput.value = cityInput.value.split('').map((e, i) => i === 0 ? e.toUpperCase() : e.toLowerCase()).join('')

      localStorage.setItem('city', cityInput.value)
      await getWeather()
  }
}

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  if(res.ok){
  weatherError.textContent = ''
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${Math.floor(data.main.temp)}°C`
  weatherDescription.textContent = data.weather[0].description
  windSpeed.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
  humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`
}
  else{
        weatherError.textContent = `Error! city not found for '${localStorage.getItem('city')}'!`
        weatherIcon.classList = `weather-icon owf`
        temperature.textContent = ''
        weatherDescription.textContent = ''
        windSpeed.textContent = ''
        humidity.textContent = ''
  }
}
function updateQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)]

  quoteText.textContent = `"${quote['quote']}"`
  quoteAuthor.textContent = quote['author']
}

async function getQuotes() {
  const response = await fetch('https://www.breakingbadapi.com/api/quotes')

  if (response.ok){
      return response.json()
  }
}

window.addEventListener('load', async () => {
  quotes = await getQuotes()

  updateQuote()
})

quoteChangeButton.addEventListener('click', updateQuote)

  window.addEventListener('beforeunload', setLocalStorage)
  window.addEventListener('load', getLocalStorage)
  window.addEventListener('load', () => {
    setTimeout(async () => {
        const storedCity = localStorage.getItem('city').trim()

        if (storedCity)
            cityInput.value = storedCity

        await getWeather()
    }, 1000)
})
  window.onload = () => {
  document.querySelector('body').style.backgroundImage = getRandomBackgroundImage()
}

  slideNext.addEventListener('click', getSlideNext)
  slidePreview.addEventListener('click', getSlidePrev)

  showTime()
  showDate()
  showGreetings()
  getWeather()
