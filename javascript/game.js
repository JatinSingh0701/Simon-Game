const buttonColours = ['red', 'blue', 'green', 'yellow'];

const gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Handle key press event for desktop devices

$('#start_button').click(function () {
    if (!started) {
        startGame();
    }
});


// Handle click and touch events for buttons

$('.btn').on('click touchstart', function () {
    const userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Start the game

function startGame() {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#start_button").hide();
}



// Generate the next sequence

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Check the user's answer

function checkAnswer(currentIndex) {

    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }

    } else {

        console.log('Wrong');
        endGame();
        playSound("wrong");

    }
}

// Play the sound for a button

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Animate the button press

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => $(`#${currentColor}`).removeClass('pressed'), 100);
}

// End the game and reset to initial state

function endGame() {

    $('#level-title').text('Game Over ' + level + ' level');
    $("#start_button").show().text('Restart');
    $('body').addClass('game-over');

    started = false;
    level = 0;
    gamePattern.length = 0;
    userClickedPattern = [];


    setTimeout(
        () => $('body').removeClass('game-over'),
        200);
}
