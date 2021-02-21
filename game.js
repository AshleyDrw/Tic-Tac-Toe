const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const lookUp = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};

let turn, winner, gameboard;

const messageEL = document.getElementById('message');
const gameboardEl = document.getElementById('gameboard');
const squareEls = document.querySelectorAll('.square');
const buttonEL = document.getElementById('reset-btn');

gameboardEl.addEventListener('click', handleMove);
buttonEL.addEventListener('click', initialize);

initialize();

function initialize() {
    gameboard = new Array(9).fill().map(() => null);
    turn = 1;
    winner = false;
    render();
}

function handleCheckWinner() {
    for(let i = 0; i < combos.length; i++) {
        if(Math.abs(
            gameboard[combos[i][0]] + 
            gameboard[combos[i][1]] + 
            gameboard[combos[i][2]]) === 3) {
                return gameboard[combos[i][0]] 
        }
    } if (gameboard.includes(null)) return false;
    return 'T'
}

function handleMove(event) {
    const position = event.target.dataset.index;
    if(gameboard[position]) return;
    gameboard[position] = turn;
    winner = handleCheckWinner();
    turn *= -1
    render();
}

function render() {
    gameboard.forEach((value, index) => {
        squareEls[index].textContent = lookUp[value];
    });

    if(!winner) {
        messageEL.textContent = `It's ${lookUp[turn]}'s Turn`;
    } else if(winner === 'T') { 
        messageEL.textContent = 'Tie Game!';
    } else {
        messageEL.textContent = `Congratulations ${lookUp[winner]} Wins!`;
    };

};