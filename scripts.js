document.addEventListener('DOMContentLoaded', () => {
    const textToTypeElement = document.getElementById('text-to-type');
    const userInputElement = document.getElementById('user-input');
    const startTestButton = document.getElementById('start-test');
    const stopTestButton = document.getElementById('stop-test');
    const resetTestButton = document.getElementById('reset-test');
    const errorCountElement = document.getElementById('error-count');
    const speedElement = document.getElementById('speed');
    const timeElement = document.getElementById('time');

    let originalText = '';
    let startTime;
    let intervalId;
    let errors = 0;
    let isTesting = false;

    const texts = [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts."
    ];

    function getRandomText() {
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    }

    function startTest() {
        originalText = getRandomText();
        textToTypeElement.textContent = originalText;
        userInputElement.disabled = false;
        userInputElement.value = '';
        userInputElement.focus();
        startTime = new Date();
        intervalId = setInterval(updateTime, 1000);
        isTesting = true;
        startTestButton.disabled = true;
        stopTestButton.disabled = false;
        resetTestButton.disabled = false;
        errors = 0;
        errorCountElement.textContent = 'Errors: 0';
        speedElement.textContent = 'Speed: 0 WPM';
        timeElement.textContent = 'Time: 0s';
    }

    function stopTest() {
        if (!isTesting) return;
        clearInterval(intervalId);
        userInputElement.disabled = true;
        isTesting = false;
        startTestButton.disabled = false;
        stopTestButton.disabled = true;
        resetTestButton.disabled = false;
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        const words = originalText.split(' ').length;
        const speed = Math.floor((words / elapsed) * 60);
        speedElement.textContent = `Speed: ${speed} WPM`;
        errorCountElement.textContent = `Errors: ${errors}`;
    }

    function updateTime() {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        timeElement.textContent = `Time: ${elapsed}s`;
        if (elapsed >= 60) {
            clearInterval(intervalId);
            endTest();
        }
    }

    function endTest() {
        userInputElement.disabled = true;
        startTestButton.disabled = false;
        stopTestButton.disabled = true;
        resetTestButton.disabled = true;
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        const words = originalText.split(' ').length;
        const speed = Math.floor((words / elapsed) * 60);
        speedElement.textContent = `Speed: ${speed} WPM`;
        errorCountElement.textContent = `Errors: ${errors}`;
    }

    function checkText() {
        const typedText = userInputElement.value;
        let index = 0;
        errors = 0;
        for (const char of typedText) {
            if (index >= originalText.length || char !== originalText[index]) {
                errors++;
            } else {
                index++;
            }
        }
        if (index === originalText.length) {
            endTest();
        } else {
            errorCountElement.textContent = `Errors: ${errors}`;
        }
    }

    startTestButton.addEventListener('click', startTest);
    stopTestButton.addEventListener('click', stopTest);
    resetTestButton.addEventListener('click', startTest);
    userInputElement.addEventListener('input', checkText);
});
