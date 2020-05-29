var busy = false;
var time;
var alertime;
var currentQuestion = null;
var score = 0;
var startmusic = new Audio('start.mp3');
//var boommusic = new Audio('boom.mp3');
var mainmusic = new Audio('main.mp3');
mainmusic.loop = true;
var endmusic = new Audio('gg.mp3');
var alarmmusic = new Audio('alarm.mp3');

//questions, options, and potential outcomes
//each option has a potential outcome, either guarantee win (w), guarantee lose (l), random choice dependent on mood (r), or guaranteed game over (gg).
let questions = [
    {"question": "My app keeps crashing, can you help?", "1": "Uninstall and Reinstall", "2": "Restart iPad", "3": "Consult iTech Manual", "4":"Clear RAM",                       "1r": "r", "2r": "r" ,"3r":"gg", "4r": "r",    "rw1": "Thanks, that worked!", "rw2": "It's working now.",                             "rl1": "Why would that work?", "rl2": "That didn't do anything",         "gg": "You read the iTech Manual"},
    {"question": "I forgot my iPad at home, can I get a loaner", "1": "Fill this form out", "2": "No", "3": "I don't have a pen", "4":"I didn't know we gave out loaners",        "1r": "w", "2r": "l" ,"3r": "r", "4r": "l",    "rw1": "Um... Ok... I'll just leave then...", "rw2": "Nevermind then, I'll just go",   "rl1": "That doesn't change anything...", "rl2": "This is ridiculous!",  "l": "How rude!  I am now angry!",                                                      "w": "Thanks!  I'll make sure to bring it back."},
    {"question": "My iPad smells", "1": "What", "2": "Go to Seudekamp (Free)", "3": "I'm Sorry?", "4":"...",                                                                      "1r": "r", "2r": "w" ,"3r": "r", "4r": "r",    "rw1": "You know, I'll just leave now.", "rw2": "Nevermind",                           "rl1": "...", "rl2": "It has an odor.",                                                                                                       "w": "Ok, sure."},
    {"question": "I lost my iPad", "1": "Check your Backpack", "2": "Go to find my iPad", "3": "Sorry kid, it's gone", "4":"Check the class you were in",                         "1r": "r", "2r": "w" ,"3r": "l", "4r": "r",    "rw1": "I found it, thanks!", "rw2": "It was exactly where I left it!",                "rl1": "Why would that work?", "rl2": "I couldn't find it.",             "l": "Not my iPad! Now I can't graduate!"},
    {"question": "My iPad can't find the printer", "1": "Walk around the media center", "2": "Keep your iPad on this screen", "3": "Send an email to ...", "4":"Not my problem.", "1r": "r", "2r": "r" ,"3r": "r", "4r": "l",    "rw1": "It's there now, thanks!", "rw2": "It shows the printer now.",                  "rl1": "That didn't do anything", "rl2": "That didn't work." ,           "l": "That's not nice, I'm going to tell the librarians about you!"}
]

window.onload = function(){
    startmusic.play();
    randomTitle();
    menutime = setInterval(randomTitle, 1000)
}

function randomTitle()
{
    var rand = Math.floor(Math.random() * 181)
    document.getElementById('title').style.transform = 'rotate(' + (90 - rand) + 'deg)';
    document.getElementById('title').style.color = '#'+Math.floor(Math.random()*16777215).toString(16);
}


function startGame()
{
    startmusic.pause();
    startmusic.currentTime = 0;
    mainmusic.play();
    document.getElementById('question').innerHTML = "";
    document.getElementById('1text').innerHTML = "";
    document.getElementById('2text').innerHTML = "";
    document.getElementById('3text').innerHTML = "";
    document.getElementById('4text').innerHTML = "";
    document.getElementById("people").style.visibility = 'hidden';
    document.getElementById('gg').style.visibility = 'hidden';
    busy = false;
    score = 0;
    document.getElementById('score').innerHTML = "Score: " + score;
    clearInterval(menutime);
    document.getElementById('game').style.visibility = 'visible';
    document.getElementById('menu').style.visibility = 'hidden';
    time = setInterval(checkTurn, 1000)
};

function checkTurn()
{
    if (busy == false)
    {
        var rand = Math.floor(Math.random() * 2)
        if (rand == 1)
        {
            getHelp();
        }
        else
        {
            document.getElementById("people").style.visibility = "hidden";
            busy = false;
        }
    }
}

//sets up a problem
function getHelp()
{
    document.getElementById('buttonguard').style.visibility = 'hidden';
    document.getElementById('alarmgaurd').style.visibility = 'hidden';
    //set person avatar
    var personChoice = Math.floor(Math.random() * 4);
    if (personChoice == 0)
    {
        document.getElementById("people").src = "person1.png";
    }
    else if (personChoice == 1)
    {
        document.getElementById("people").src = "person2.png";
    }
    else if (personChoice == 2)
    {
        document.getElementById("people").src = "person3.png";
    }
    else if (personChoice == 3)
    {
        document.getElementById("people").src = "person4.png";
    }
    busy = true;
    document.getElementById("people").style.visibility = "visible";

    //set questions
    var questionChoice = Math.floor(Math.random() * 5);
    currentQuestion = questionChoice;
    typeText(questions[questionChoice].question, 1);
    document.getElementById('1text').innerHTML = questions[questionChoice]["1"]
    document.getElementById('2text').innerHTML = questions[questionChoice]["2"]
    document.getElementById('3text').innerHTML = questions[questionChoice]["3"]
    document.getElementById('4text').innerHTML = questions[questionChoice]["4"]
}

function response(choice)
{
    if (choice != 5)
    {
        var outcome = questions[currentQuestion][choice.toString() + "r"]
        if (outcome == "r")
        {
            var randomOutcome = Math.floor(Math.random() * 5)
            if (randomOutcome == 0)
            {
                typeText(questions[currentQuestion]["rl1"], 1)
                score -= 100;
                document.getElementById('score').innerHTML = "Score: " + score;
            }
            else if (randomOutcome == 1)
            {
               typeText(questions[currentQuestion]["rl2"], 1);
                score -= 100;
                document.getElementById('score').innerHTML = "Score: " + score;
            }
            else if (randomOutcome == 2)
            {
                typeText(questions[currentQuestion]["rw1"], 1);
                score += 100;
                document.getElementById('score').innerHTML = "Score: " + score;
                setTimeout(resetQuestion, 2000)
                document.getElementById('buttonguard').style.visibility = 'visible';
                document.getElementById('alarmgaurd').style.visibility = 'visible';
            }
            else if (randomOutcome == 3)
            {
                typeText(questions[currentQuestion]["rw2"], 1);
                score += 100;
                document.getElementById('score').innerHTML = "Score: " + score;
                setTimeout(resetQuestion, 2000)
                document.getElementById('buttonguard').style.visibility = 'visible';
                document.getElementById('alarmgaurd').style.visibility = 'visible';
            }
        }
        else if (outcome == "l")
        {
            typeText(questions[currentQuestion]["l"], 1);
            score -= 100;
            document.getElementById('score').innerHTML = "Score: " + score;
            setTimeout(resetQuestion, 2000)
            document.getElementById('buttonguard').style.visibility = 'visible';
            document.getElementById('alarmgaurd').style.visibility = 'visible';
        }
        else if (outcome == "w")
        {
            typeText(questions[currentQuestion]["w"], 1);
            score += 100;
            document.getElementById('score').innerHTML = "Score: " + score;
            setTimeout(resetQuestion, 2000)
            document.getElementById('buttonguard').style.visibility = 'visible';
            document.getElementById('alarmgaurd').style.visibility = 'visible';
        }
        else if (outcome == "gg")
        {
            typeText(questions[currentQuestion]["gg"], 1);
            document.getElementById("gg").style.visibility = 'visible';
            stopTime();
            mainmusic.pause();
            mainmusic.currentTime = 0;
            endmusic.play();
        }
    }
    else
    {
        document.getElementById('buttonguard').style.visibility = 'visible';
        document.getElementById('alarmgaurd').style.visibility = 'visible';
        score -= 200;
        document.getElementById('score').innerHTML = "Score: " + score;
        alert();
        setTimeout(resetQuestion, 5000)
        mainmusic.pause();
        mainmusic.currentTime = 0;
        setTimeout(function(){mainmusic.play()}, 5000);
        alarmmusic.play();
        setTimeout(function(){alarmmusic.pause(); startmusic.currentTime = 0;}, 4500);
    }

}

//stops game timer
function stopTime()
{
    clearInterval(time);
    clearInterval(alertime);
}

function alert()
{
    if (busy == true)
    {
        document.getElementById("panicalert").style.visibility = "visible";
        document.getElementById('panicalert').style.opacity = '1'
        setTimeout(function(){document.getElementById('panicalert').style.opacity = '0'}, 1250);
        setTimeout(function(){document.getElementById('panicalert').style.opacity = '1'}, 2500);
        setTimeout(function(){document.getElementById('panicalert').style.opacity = '0'}, 3750);
    }
}

function resetQuestion()
{
    document.getElementById('buttonguard').style.visibility = 'visible';
    document.getElementById('alarmgaurd').style.visibility = 'visible';
    document.getElementById("people").style.visibility = "hidden";
    document.getElementById('1text').innerHTML = "";
    document.getElementById('2text').innerHTML = "";
    document.getElementById('3text').innerHTML = "";
    document.getElementById('4text').innerHTML = "";
    document.getElementById("question").innerHTML = "";
    busy = false
}

function typeText(text, i)
{
    if (i < text.length)
    {
        var f = i += 1
        document.getElementById('question').innerHTML = text.substring(0, i);
        setTimeout(function(){typeText(text, f)}, 20);
    }
}

function menu()
{
    mainmusic.pause();
    mainmusic.currentTime = 0;
    alarmmusic.pause();
    alarmmusic.currentTime = 0;
    startmusic.play();
    randomTitle();
    menutime = setInterval(randomTitle, 1000)
    stopTime();
    document.getElementById('game').style.visibility = 'hidden';
    document.getElementById('menu').style.visibility = 'visible';
}