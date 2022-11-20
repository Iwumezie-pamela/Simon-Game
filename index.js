const h1 = $('#level-title');
const button = $('.btn');
let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;

  $(document).on('keydown',function () {
    if (!started) {
        nextSequence();
        h1.text('level ' + level);
        started = true;
    } 
})

function nextSequence() {
    level++;
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    h1.text('level ' + level); 
}

function playSound(name) {
   var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

button.click(function () {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}) 

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
   $("#" + currentColour).removeClass("pressed");
}, 100);
}

function  checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');

        $('body').addClass('game-over');
setTimeout(() => {
      $('body').removeClass('game-over');
}, 200);
        
        h1.text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    gamePattern= [];
    started= false;
    level = 0;
}
