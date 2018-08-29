const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];

const main = document.getElementById("maze");

for (let i = 0; i < map.length; i++) {
    let row = map[i];
    let mazeBoard = document.createElement("div");
    mazeBoard.classList.add("mazeRow");
    for (let j = 0; j < row.length; j++) {
        let wall = document.createElement("div");
        wall.dataset.rowIndex = i;
        wall.dataset.cellIndex = j;
        mazeBoard.appendChild(wall);

        switch (row[j]) {
            case "W":
                wall.classList.add("borderWall");
                wall.dataset.cellType = "border";
                break;

            case "S":
                wall.setAttribute("id", "start");
                wall.dataset.cellType = "start";
                break;

            case " ":
                wall.classList.add("blankSpace");
                wall.dataset.cellType = "floor";
                break;

            case "F":
                wall.setAttribute("id", "finish");
                wall.dataset.cellType = "end";
                break;
        }
    }
    main.appendChild(mazeBoard)
}

let boxTop;
let boxLeft;
let x;
let y;

const player = document.getElementById("player");

let start = document.getElementById("start");
start.appendChild(player);

let currentPosition = start;


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            let nextPositionUp = Number(currentPosition.dataset.rowIndex) - 1;
            let nextMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            if (nextMoveUp.dataset.cellType === "floor") {
                nextMoveUp.appendChild(player);
                currentPosition = nextMoveUp;
            }
            break;

        case 'ArrowDown':
            let nextPositionDown = Number(currentPosition.dataset.rowIndex) + 1;
            let nextMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            if (nextMoveDown.dataset.cellType === "floor") {
                nextMoveDown.appendChild(player);
                currentPosition = nextMoveDown;
            }
            break;

        case 'ArrowLeft':
            let nextPositionLeft = Number(currentPosition.dataset.cellIndex) - 1;
            let nextMoveLeft = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionLeft + "']");
            if (nextMoveLeft.dataset.cellType === "floor") {
                nextMoveLeft.appendChild(player);
                currentPosition = nextMoveLeft;
            }
            break;

        case 'ArrowRight':
            let nextPositionRight = Number(currentPosition.dataset.cellIndex) + 1;
            let nextMoveRight = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionRight + "']");
            if (nextMoveRight.dataset.cellType === "floor") {
                nextMoveRight.appendChild(player);
                currentPosition = nextMoveRight;
            } else if (nextMoveRight.dataset.cellType === "end") {
                nextMoveRight.appendChild(player);
                currentPosition = nextMoveRight;
                setTimeout(function () {
                    winner = alert("You won!");
                }, 500);
            }
            break;
    }
    document.getElementById("msg").innerHTML = +winner + " has won!";
    document.getElementById("player").style.top = boxTop + "px";
    document.getElementById("player").style.left = boxLeft + "px";
})