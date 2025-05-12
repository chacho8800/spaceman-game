/*-------------------------------- Constants --------------------------------*/
const countriesList = ["Armenia", "France", "Germany", "United States", "Italy", "Brazil", "Spain", "Mexico", "Russia", "Japan"]

const hints = [
    "The capital is Yerevan",        // Armenia
    "Eiffel Tower is here",          // France
    "Known for Oktoberfest",         // Germany
    "Has 50 states",                 // United States
    "Famous for pizza and pasta",   // Italy
    "Home of Carnival and Amazon",  // Brazil
    "Barcelona is a major city",    // Spain
    "Tacos and mariachi music",     // Mexico
    "Largest country by land",      // Russia
    "Land of the Rising Sun"        // Japan
];


/*---------------------------- Variables (state) ----------------------------*/
let randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)].toUpperCase()
let wrongLetters = []
let correctLetters = []
let lives = 5



/*------------------------ Cached Element References ------------------------*/
const livesEl = document.querySelector(".lives")
livesEl.textContent =  `❤️ ${lives}`
const alphabetEl = Array.from(document.querySelectorAll(".key"))
const wrongLettersEl = document.querySelector("#wrong-letters")
const displayEl = document.querySelector(".display")
const hintBtn = document.querySelector("#hint")
const resetBtn = document.querySelector("#reset")
const hintdisplay = document.querySelector(".hint-display")
const resultMsg = document.querySelector(".msg")


/*-------------------------------- Functions --------------------------------*/

const handleLetterClick = (event) => {
    
    checkLives(event)
    correctWrongLetters(event)

}



const checkLives = (event) => {
    const letter = event.target.innerText
if (!randomCountry.includes(letter)){
    lives -= 1
    livesEl.textContent = `❤️ ${lives}`
} 
if (lives <= 0) {
    disableAlphabet()
    resultMsg.textContent = `💔 Game Over`

}

}

const correctWrongLetters = (event) => {
    const letter = event.target.innerText
  
if (correctLetters.includes(letter) || wrongLetters.includes(letter)) return;

  
if (randomCountry.includes(letter)) {
    correctLetters.push(letter)
} else {
    wrongLetters.push(letter)
    wrongLettersEl.textContent = wrongLetters.join(" ")

} 

updateDisplay()

}
    
function updateDisplay() {
    displayEl.textContent = randomCountry.split("").map(char => {
    if (char === " ") return " "
    return correctLetters.includes(char) ? char : "_"
    
}).join(" ")
winner()
}


function resetGame() {
    correctLetters = []
    wrongLetters = []
    lives = 5
    randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)].toUpperCase()
    

    livesEl.textContent = `❤️ ${lives}`;
    wrongLettersEl.textContent = "";
    hintdisplay.textContent = ""
    resultMsg.textContent = ""
    updateDisplay();
    
    alphabetEl.forEach(button => {
        button.addEventListener("click", handleLetterClick)
       
    
    })

}

function hint() {
    const index = countriesList.findIndex(country => country.toUpperCase() === randomCountry)
    if (index !== -1) {
        hintdisplay.textContent = `💡 ${hints[index]}`
    } 
    
}


const winner = () => {
    const allGuessed = randomCountry.split("").every(char => {
        return char === " " || correctLetters.includes(char)

    })

    if (allGuessed) {
        resultMsg.textContent = `🚀 You Win!`
        disableAlphabet()
    } 
    
}   

const disableAlphabet = () => {
    alphabetEl.forEach(button => {
        button.removeEventListener("click", handleLetterClick)
    })
}





/*----------------------------- Event Listeners -----------------------------*/
alphabetEl.forEach(button => {
    button.addEventListener("click", handleLetterClick)
   

})

resetBtn.addEventListener("click", resetGame)

hintBtn.addEventListener("click", hint)




