


const DIMENSIONS = 8
const CELL_SIZE = 50
const HORSE_SIZE = 28
const INITIAL_POSITION = "1-1" 

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

let contadorX = 1
// setInterval(() => {
//     moveHorse(DIRECTONS.DOWN, DIRECTONS.LEFT, `${contadorX}-4`)
//     contadorX++
// }, 2000)


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
            
            tabuleiro.appendChild(tableCell)

            const horse = createHorse();
            tableCell.appendChild(horse)   
        
        }
    }
}

function moveHorse(directionY, directionX, currentCellIndex) {
    switch (`${directionY}-${directionX}`) {
        case `${DIRECTONS.DOWN}-${DIRECTONS.LEFT}` :
            const horse = createHorse();
            const currentCell = document.getElementById(currentCellIndex)
            console.log(currentCell)
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