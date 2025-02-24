const timer = document.querySelector('#timer')
//00:00.00
let startTime;
let running = false;
let timerInterval;
let elapsedMilliseconds = 0;
//timer.textContent = `${minutes}:${seconds}.${milliseconds}`

function startTimer(){
  document.addEventListener('keyup', stopTimer)
  document.removeEventListener('keyup', startTimer)
  timer.onclick = stopTimer
  startTime = performance.now() - elapsedMilliseconds
  timerInterval = setInterval(() => {
    elapsedMilliseconds = performance.now() - startTime;
    updateDisplay(Math.floor(elapsedMilliseconds));
  }, 10);
  running = true;
}

function stopTimer(){
  document.addEventListener('keyup', startTimer)
  document.removeEventListener('keyup', stopTimer)
  timer.onclick = startTimer
  clearInterval(timerInterval);
  running = false
}

function updateDisplay(elapsedMilliseconds){
  const {minutes, seconds, milliseconds} = formatTime(elapsedMilliseconds)
  timer.textContent = `${minutes}:${seconds}.${milliseconds}` 
}

function formatTime(elapsedMilliseconds){
 const minute = Math.floor( elapsedMilliseconds / (60 * 1000))
 const second = Math.floor((elapsedMilliseconds % (60 * 1000)) / 1000)
 const millisecond = elapsedMilliseconds % 1000

const minutes = String(minute).padStart(2, '0');
const seconds = String(second).padStart(2, '0');
const milliseconds = String(millisecond).padStart(3, '0'); 
  return {minutes, seconds, milliseconds}
}

//
document.addEventListener('keyup', startTimer)