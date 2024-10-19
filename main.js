let timers = [];
let timeIntervals = [];

function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function addTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Ensure valid input, avoid timers with no time set.
    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please set a valid time.");
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const timer = {
        id: Date.now(),  // Unique identifier for the timer.
        totalSeconds: totalSeconds,
        remainingSeconds: totalSeconds
    };

    timers.push(timer);
    startTimer(timer);
    updateTimerDisplay();
    clearInputs();
}

function startTimer(timer) {
    const interval = setInterval(() => {
        timer.remainingSeconds--;

        if (timer.remainingSeconds <= 0) {
            clearInterval(interval);
            showTimerComplete(timer.id);
            removeTimer(timer.id);
        }
        updateTimerDisplay();
    }, 1000);  // Countdown updates every second.

    timeIntervals.push({ id: timer.id, interval });
}

function removeTimer(id) {
    timers = timers.filter(t => t.id !== id);
    const intervalObject = timeIntervals.find(t => t.id === id);
    if (intervalObject) {
        clearInterval(intervalObject.interval);
        timeIntervals = timeIntervals.filter(t => t.id !== id);
    }
    updateTimerDisplay();
}

function showTimerComplete(id) {
    const timerCompleteElement = document.querySelector('.time_complete');
    timerCompleteElement.style.display = 'block';

    const stopButton = document.querySelector('.reset-button');
    stopButton.onclick = () => {
        timerCompleteElement.style.display = 'none';
    };
}

function updateTimerDisplay() {
    const timeContainer = document.querySelector('.time_container');
    timeContainer.innerHTML = '';  // Clear existing timers before re-rendering.

    timers.forEach(timer => {
        const hours = Math.floor(timer.remainingSeconds / 3600);
        const minutes = Math.floor((timer.remainingSeconds % 3600) / 60);
        const seconds = timer.remainingSeconds % 60;

        const timerElement = document.createElement('div');
        timerElement.className = 'timer';

        timerElement.innerHTML = `
            <span class="timer-text">Time Left: ${formatTime(hours, minutes, seconds)}</span>
            <button class="delete-button" onclick="removeTimer(${timer.id})">Delete</button>
        `;

        timeContainer.appendChild(timerElement);
    });

    const noTimersText = document.querySelector('.current-time-button');
    noTimersText.textContent = timers.length === 0 ? 'You have no timers currently' : 'Current Timers';
}

function clearInputs() {
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}

document.querySelector('.reset-button').addEventListener('click', () => {
    document.querySelector('.time_complete').style.display = 'none';
});

updateTimerDisplay();