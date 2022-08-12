import i18next from 'https://deno.land/x/i18next/index.js'
let randomNum = Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0')
let slideNext = document.querySelector('.slide-next')
let slidePreview = document.querySelector('.slide-prev')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const windSpeed = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const cityInput = document.querySelector('.city')
const weatherError = document.querySelector('.weather-error')
const quoteText = document.querySelector('.quote')
const quoteAuthor = document.querySelector('.author')
const quoteChangeButton = document.querySelector('.change-quote')
let quotes = ''
const playButton = document.querySelector('.play')
const nextPlayerButton = document.querySelector('.play-next')
const previousPlayerButton = document.querySelector('.play-prev')
const playlistTable = document.querySelector('.play-list')
const progress = document.querySelector('.progress')
const trackNames = ["Ennio Morricone", "Aqua Caelestis", "River Flows In You", "Summer Wind"]


let isPlayed = false
let currentTrack = 0
let playlist = trackNames.map((name) =>
    new Audio(
        `https://github.com/VasaSkor/Momentum/blob/momentum/assets/sounds/${
            name.replaceAll(' ', '%20')
        }.mp3?raw=true`
    ))
let currentAudio = playlist[0]


window.addEventListener('load', () => {
    playlist.forEach((track, index) => {
        track.load()

        track.addEventListener('canplaythrough', () => {
            const track = document.createElement('li')
            track.textContent = trackNames[index]

            if (index == currentTrack)
                track.classList = 'play-item item-active'
            else
                track.classList = 'play-item'


            playlistTable.appendChild(track)
        })
    })
})

nextPlayerButton.addEventListener('click', () => {
    currentTrack++
    
    if (currentTrack > playlist.length - 1)
        currentTrack = 0

    markSelectedTrack()
    updatePlayerTrack()
})

previousPlayerButton.addEventListener('click', () => {
    currentTrack--
    
    if (currentTrack < 0)
        currentTrack = playlist.length - 1

    markSelectedTrack()
    updatePlayerTrack()
})

playButton.addEventListener('click', () => {
    if (isPlayed){
        currentAudio.pause()
        playButton.classList = 'play player-icon'
    }
    else{
        currentAudio.play()
        playButton.classList = 'play player-icon pause'
    }
        

    isPlayed = !isPlayed
})

function updatePlayerTrack() {
    if (isPlayed === true) {
        currentAudio.pause()
        currentAudio = playlist[currentTrack]
        currentAudio.play()
    }
    else {
        currentAudio = playlist[currentTrack]
    }
}

function markSelectedTrack() {
    for (let i = 0; i < playlistTable.childElementCount; i++) {
        playlistTable.children[i].classList = 'play-item'
    }

    playlistTable.children[currentTrack].classList = 'play-item item-active'
}

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
  const options = {weekday: 'long', month: 'long', day: 'numeric',}
  const currentDate = date.toLocaleDateString(i18next.t('currentDate'), options);
  date_block.textContent = currentDate
  setTimeout(showDate, 1000);
  return date_block
}

function showGreetings(){
  const greetings = document.querySelector('.greeting')
  const arrGreetings = [`${i18next.t('morning')}`, `${i18next.t('afternoon')}`, `${i18next.t('evening')}`, `${i18next.t('night')}`]
  const date = new Date()
  const GetHours = date.getHours()
  setTimeout(showGreetings, 1000);
  if(GetHours >= 6 && GetHours <= 11){
   return greetings.textContent = `${i18next.t('TextGoogCurrentMorning')} ${arrGreetings[0]}`
  }
  else if(GetHours >= 12 && GetHours <= 17){
    return greetings.textContent = `${i18next.t('TextGoogCurrentAfternoon')} ${arrGreetings[1]}`
  }
  else if(GetHours >= 18 && GetHours <= 23){
    return greetings.textContent = `${i18next.t('TextGoogCurrentAfternoon')} ${arrGreetings[2]}`
  }
  else if(GetHours >= 0 && GetHours <= 5){
    return greetings.textContent = `${i18next.t('TextGoogCurrentNight')} ${arrGreetings[3]}`
  }
}

function setLocalStorage() {
  const name = document.querySelector('.name')
  localStorage.setItem('name', name.value);
}

function getLocalStorage() {
  let placeholder = document.querySelector('.name').placeholder = i18next.t('placeholder')
  const name = document.querySelector('.name')
  placeholder = i18next.t('placeholder')
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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${i18next.t('weather_lang')}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  if(res.ok){
  weatherError.textContent = ''
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${Math.floor(data.main.temp)}°C`
  weatherDescription.textContent = data.weather[0].description
  windSpeed.textContent = i18next.t('weather_wind_speed', {speed: Math.floor(data.wind.speed)})
  humidity.textContent = i18next.t('Humidity', {humidity: Math.floor(data.main.humidity)})
}
  else{
        weatherError.textContent = `Error! city not found for '${localStorage.getItem('city')}'!`
        weatherIcon.classList = `weather-icon owf`
        temperature.textContent = ''
        weatherDescription.textContent = ''
        windSpeed.textContent = ''
        humidity.textContent = ''
  }
  if (cityInput.value == ''){
    cityInput.value = i18next.t('cityInputValue')
  }
}
function updateQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)]

  quoteText.textContent = `"${quote['text']}"`
  quoteAuthor.textContent = quote['author']
}


async function getQuotes() {
  const response = await fetch('https://raw.githubusercontent.com/rolling-scopes-school/file-storage/random-jokes/quotes.json')
  

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
        const storedCity = localStorage.getItem('city')
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

  window.addEventListener('DOMContentLoaded', async () =>{
    await i18next.init({
      lng: navigator.language,
      debug: false,
      resources: {
        en:{
          translation: {
            "weather_wind_speed": 'Wind speed: {{speed}} m/s',
            "weather_lang": 'en',
            "Humidity": 'Humidity: {{humidity}}%',
            "cityInputValue": 'Minsk',
            "placeholder": 'Enter your name',
            "currentDate": 'en-US',
            "TextGoogCurrentMorning": 'Good',
            "TextGoogCurrentAfternoon": 'Good',
            "TextGoogCurrentNight": 'Good',
            "morning": 'morning',
            "afternoon": 'afternoon',
            "evening": 'evening',
            "night": 'night',
          }
        },
        ru:{
          translation:{
            "weather_wind_speed": "Скорость ветра: {{speed}} м/с",
            "weather_lang": 'ru',
            "Humidity": 'Влажность: {{humidity}}%',
            "cityInputValue": 'Минск',
            "placeholder": 'Введите своё имя',
            "currentDate": 'ru-RU',
            "TextGoogCurrentMorning": 'Доброе',
            "TextGoogCurrentAfternoon": 'Доброго',
            "TextGoogCurrentNight": 'Доброй',
            "morning": 'утро',
            "afternoon": 'дня',
            "evening": 'вечера',
            "night": 'ночи',
          }
        }
      }
    });
  })

