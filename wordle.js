let global_word;
let global_words;
let global_words2;

function check_win(filled_rows) {

    rowID = (`row${filled_rows}`)
    row = document.getElementById(rowID)
    let letters = row.getElementsByTagName('div');
    let greens = []

    for (let i of letters) {
        if (i.classList.contains('green')) {
            greens.push('1')
        }
    }

    console.log(greens)

    if (greens.length == 5) {
        row.classList.add('winningRow')
        youWin = document.createElement('p')
        youWin.setAttribute('id', 'youWin')
        youWin.textContent = ('You Win! ' + global_word.toUpperCase())
        document.body.appendChild(youWin)

        row.addEventListener('click', function() {
            window.open(`https://www.google.com/search?q=${global_word + ' definition'}`)
        })
        youWin.addEventListener('click', function() {
            window.open(`https://www.google.com/search?q=${global_word + ' definition'}`)
        })
        return true
    }
    else {
        return false
    }
}


function read_random_word() {
    const xhr1 = new XMLHttpRequest();
    const xhr2 = new XMLHttpRequest();
  
    const promise1 = new Promise((resolve, reject) => {
      xhr1.open('GET', 'five_letter_words_V2.txt');
      xhr1.onload = function () {
        const words2 = xhr1.responseText.trim().split(' ');
        global_words2 = words2;
        resolve();
      };
      xhr1.send();
    });
  
    const promise2 = new Promise((resolve, reject) => {
      xhr2.open('GET', 'five_letter_words.txt');
      xhr2.onload = function () {
        const words = xhr2.responseText.trim().split(' ');
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        global_word = word;
        global_words = words;
        resolve();
      };
      xhr2.send();
    });
  
    Promise.all([promise1, promise2]).then(() => {
    });
  }
  


let loops = 1;
let loops2 = 1
rows_filled = 0
function check_letter(x) {

    console.log(global_word)
    let greenLetters = []

    for (let i = 0; i < x.length; i++) {
        let rowID = (`r${loops2}l${loops}`)
        let element = document.getElementById(rowID);
        element.textContent = x[i].toUpperCase();

        if (global_word.toUpperCase().includes(element.textContent.toUpperCase()) &&
            x.toUpperCase().indexOf(element.textContent.toUpperCase()) !== global_word.indexOf(element.textContent.toUpperCase())) {
        }

        if (element.textContent.toUpperCase() == global_word[i].toUpperCase()) {
            element.classList.add('green')
            greenLetters.push(element.textContent.toUpperCase());
        } else if (!greenLetters.includes(element.textContent.toUpperCase()) && global_word.toUpperCase().includes(element.textContent.toUpperCase())) {
            element.classList.add('blue');
        }

        loops += 1
        if (loops > 5) {
            loops2 += 1
            loops -= 5
            rows_filled += 1

        }
    }


    check_win(rows_filled)

    if (rows_filled == 6 && !check_win(rows_filled)) {
        youLose = document.createElement('p')
        youLose.setAttribute('id', 'youLose')
        youLose.textContent = `You Lose! Word: ${global_word.toUpperCase()}`
        
        youLose.addEventListener('click', function() {
            window.open(`https://www.google.com/search?q=${global_word + ' definition'}`)
        })
        
        document.body.appendChild(youLose)
    }
}
    


var inputBox = document.getElementById('guess');
inputBox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let letter_guess = inputBox.value;
        if (letter_guess.length < 5) {
            alert('Guess must be 5 character!')
        }
        
        else if (!(global_words).includes(letter_guess) && !(global_words2).includes(letter_guess)) {
            alert('Gues not in word list!')
            inputBox.value = ''
            inputBox.blur();
        }
        else {
            check_letter(letter_guess)
            inputBox.value = ''
            inputBox.blur();
        }
    }
})


window.onload = function () {
    read_random_word(function (word) {
        word;
    });
}
