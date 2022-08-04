const bodyBackground = document.querySelector('body')
bodyBackground.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";
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

  window.addEventListener('beforeunload', setLocalStorage)
  window.addEventListener('load', getLocalStorage)
  showTime()
  showDate()
  showGreetings()
