let randomNum = Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0')
let slideNext = document.querySelector('.slide-next')
let slidePreview = document.querySelector('.slide-prev')
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

  window.addEventListener('beforeunload', setLocalStorage)
  window.addEventListener('load', getLocalStorage)
  window.onload = () => {
  document.querySelector('body').style.backgroundImage = getRandomBackgroundImage()
}
  slideNext.addEventListener('click', getSlideNext)
  slidePreview.addEventListener('click', getSlidePrev)
  showTime()
  showDate()
  showGreetings()
