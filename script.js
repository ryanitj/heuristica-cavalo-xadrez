


const DIMENSIONS = 8
const CELL_SIZE = 50
const HORSE_SIZE = 28
const INITIAL_POSITION = "1-1" 
const BOUNDS = [
    1,
    8,
    1,
    8
]
let CAVALGATED_CELLS = []
let COUNTER_CAVALGATED = 0
let MAX_CELLS = 0

let MOVES = {
    right:{
        up:['2_1'],
        down:['2_-1']
    },
    up:{
        right:['2_1'],
        left:['2_-1']
    },
    down:{
        right:['-2_1'],
        left:['-2_-1']
    },
    left:{
        up:['-2_1'],
        down:['-2_-1']
    },
}

let MOVES_LIST = {
    first: [
        "right",
        "up",
        "down",
        "left",
    ],
    second: [
        "up",
        "right",
        "down",
        "left",
    ]
}

let CURRENT_CELL = '1-1'

const DIRECTONS = {
    "UP":1,
    "DOWN":2,
    "RIGHT":3,
    "LEFT":4,
}

const TABLE_CELL_STYLE = `
    width:${CELL_SIZE}px;
    height:${CELL_SIZE}px;
    border:1px solid black;
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
`

const HORSE_STYLE = `
    width:${HORSE_SIZE}px;
    height:${HORSE_SIZE}px;
    filter: saturate(3);
`

const TABULEIRO_STYLE = `
    position:relative;
    width:${CELL_SIZE * (DIMENSIONS - 1)}px;
    height:${CELL_SIZE * (DIMENSIONS - 1)}px
`

const tabuleiro = document.getElementById("tabulero")
tabuleiro.style = TABULEIRO_STYLE;

initTable()
initMoveHorse()

function initTable() {
    for (let x = 0; x < DIMENSIONS; x++) {
        for (let y = 0; y < DIMENSIONS; y++) {
            const tableCell = document.createElement('div');

            tableCell.style = TABLE_CELL_STYLE;
            const xPosition = CELL_SIZE * (x - 1);
            const yPosition = CELL_SIZE * (y - 1);

            tableCell.setAttribute("style", `
                ${TABLE_CELL_STYLE} 
                left:${xPosition}px; 
                top:${yPosition}px;
            `)
            tableCell.setAttribute("id", `${x}-${y}`)
            tableCell.setAttribute("class", `available`)
            
            tabuleiro.appendChild(tableCell)
            
            if(x == 0 && y == 0){
                const horse = createHorse();
                tableCell.appendChild(horse)  
            }

            MAX_CELLS++;
        }
    }
}

function initMoveHorse() {
    calculateCloserCell('7-1')
}

function calculateCloserCell(_currentCell) {
    const [xCell, yCell] = _currentCell.split('-');
    let nextCell;
    let nextMove = MOVES.up.right;
    let counterFirstMove = 0;
    let counterSecondMove = 0;
    let direction = 0;
    let direction2 = 0;

    while (!nextCell) {
        const splittedNextMove = nextMove[0].split("_");
        const nextX = parseInt(xCell) + parseInt(splittedNextMove[0]) 
        const nextY = parseInt(yCell) + parseInt(splittedNextMove[1])

        const auxNextCell = document.getElementById(`${nextX}-${nextY}`);
        if(auxNextCell && auxNextCell.classList[0] == "available"){
            const currentCellDocument = document.getElementById(`${xCell}-${yCell}`);

            currentCellDocument.classList = [];
            currentCellDocument.setAttribute("class", "done");

            auxNextCell.setAttribute("class", 'pending')

            nextCell = `${nextX}-${nextY}`;
        } else {
            if(MOVES_LIST.first[counterFirstMove] == MOVES_LIST.second[counterSecondMove]){
                if(counterSecondMove == 3){
                    counterSecondMove--;
                } else {
                    counterSecondMove++;
                }
            }
            
            const validMove = MOVES[`${MOVES_LIST.first[counterFirstMove]}`][`${MOVES_LIST.second[counterSecondMove]}`];

            if(validMove && direction == 0){
                nextMove = MOVES[`${MOVES_LIST.first[counterFirstMove]}`][`${MOVES_LIST.second[counterSecondMove]}`];
                counterSecondMove++

                if(counterSecondMove % 2 == 0){
                    counterFirstMove++;
                }

                if(counterFirstMove == 3){
                    direction = 1;
                }

            } else {
                if(counterSecondMove == 0){
                    direction2 = 1
                } else if (counterSecondMove == 3) {
                    direction2 = 0
                } 

                if(direction2 == 1){
                    counterSecondMove++
                } else {
                    counterSecondMove--
                }
                
                if(counterSecondMove % 2 == 0){
                    if(counterFirstMove == 0){
                        counterFirstMove = 1;
                    } else {
                        counterFirstMove--;
                    }
                }
                if(counterFirstMove == 0){
                    direction = 0;
                }
            }
        }
    }

    return nextCell;

}

function moveHorse(directionY, directionX, currentCellIndex) {
    switch (`${directionY}-${directionX}`) {
        case `${DIRECTONS.DOWN}-${DIRECTONS.LEFT}` :
            const horse = createHorse();
            const currentCell = document.getElementById(currentCellIndex)
            currentCell.appendChild(horse)
            
            break;
        case `${DIRECTONS.UP}-${DIRECTONS.LEFT}` :

            break;
        case `${DIRECTONS.DOWN}-${DIRECTONS.RIGHT}` :

            break;
        case `${DIRECTONS.UP}-${DIRECTONS.RIGHT}` :

            break;
        case `${DIRECTONS.LEFT}-${DIRECTONS.UP}` :

            break;
        case `${DIRECTONS.RIGHT}-${DIRECTONS.UP}` :

            break;
        case `${DIRECTONS.LEFT}-${DIRECTONS.DOWN}` :

            break;
        case `${DIRECTONS.RIGHT}-${DIRECTONS.DOWN}` :

            break;
        default:
            break;
    }
}

function createHorse(){
    let horse = document.getElementById("cavalo")
    if(horse){
        horse.remove();
    }
    horse = document.createElement('img')
    horse.style = HORSE_STYLE;
    horse.setAttribute("src", "./cavalo.png")
    horse.setAttribute("id", "cavalo")

    return horse;
}