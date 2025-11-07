const countdown = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
let startTime = 10;
let timerId = null;

startButton.addEventListener('click', function() {
    // prevent starting multiple intervals on repeated clicks
    if (timerId !== null) return;

    // show initial time immediately
    countdown.textContent = startTime;

    timerId = setInterval(function() {
        if (startTime > 0) {
            startTime--;
            countdown.textContent = startTime;
        } else {
            countdown.textContent = "Time's up!";
            clearInterval(timerId);
            timerId = null;
        }
    }, 1000);
});