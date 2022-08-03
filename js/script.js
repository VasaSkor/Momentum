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
  showTime()
  showDate()
