const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


// List of Words for game
const words = [
    'man',
    'hydrant',
    'kitty',
    'accessible',
    'stroke',
    'addition',
    'far',
    'minor',
    'protect',
    'alike',
    'board',
    'mind',
    'fat',
    'lake',
    'difficult',
    'women',
    'wet',
    'cautious',
    'touch',
    'ball',
    'roomy',
    'stiff',
    'unit',
    'exercise',
    'shock',
    'weather',
    'coast',
    'book',
    'pizzas',
    'shave',
    'exuberant',
    'rude',
    'bead',
    'guard',
    'remove',
    'maniacal',
    'fuel',
    'ugliest',
    'flood',
    'efficient',
];

//init word

let randomWord;

//Init score
let score = 0;

//Init time

let time = 10;

//Set difficulty to value in Local Storage
let difficulty = localStorage.getItem('difficulty')!== null?
localStorage.getItem('difficulty'):'medium';


//set Difficulty set value
difficultySelect.value= localStorage.getItem('difficulty')!== null?
localStorage.getItem('difficulty'):'medium';

//Focus on text on start
text.focus();

//Start Counting Down
const timeInterval = setInterval(updateTime, 1000);


//Generates Random Word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}




//Add word to dom

function addWordtoDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

addWordtoDOM();

//Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//Update Time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval)

        //end game
        gameOver();
    }
}

//Game over,Show End Screen

function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time Ran out</h1>
        <p> Your Final Score is ${score}</p>
        <button onClick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
    ;
}

//Event Listners

//Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;


    if (insertedText === randomWord) {
        addWordtoDOM();
        updateScore();


        //Clear
        e.target.value = '';

        if(difficulty === 'hard'){
            time +=5;

        }else if (difficulty === 'medium'){
            time+=8;
        }else{
            time+=10;
        }
        
        updateTime();
    }

})

//Settings Btn Click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings Select
settingsForm.addEventListener('change', e =>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
});