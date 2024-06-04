
const EXIT_FAILURE = 1;
const EXIT_SUCESS = 0;


/**
 * 0 -> red
 * 1 -> orange
 * 2 -> yellow
 * 3 -> green
 * 4 -> lightgreen
 * 5 -> blue
 * 6 -> purple
 */
let option = 0;

// color to be paint
// default to black
let paintColor = "black";

(async () => {
    console.log("Hello");
    const result = await main();
    if (result == EXIT_FAILURE) {
        console.log("EXIT FAILTURE");
    } else {
        console.log("EXIT SUCCESS");
    }
})();


function startProgram() {
    return new Promise ((resolve) => {
        const start = document.querySelector("button.start");
        start.addEventListener("click", () => {
            resolve();
        });
    });
}

function erase() {
    paintColor = "white";
}

function _addColor_basic(event) {
    event.target.style.backgroundColor = paintColor.toString();
}

function _addColor_mix(event) {
    let color;
    switch(option) {
        case 0:
            color = "red";
            break;
        case 1:
            color = "orange";
            break;
        case 2:
            color = "yellow";
            break;
        case 3: 
            color = "green";
            break;
        case 4:
            color = "lightblue";
            break;
        case 5:
            color = "blue";
            break;
        case 6:
            color = "purple";
            break;
        default:
            option = 0; // reset
            color = "red";
            break;
    }
    option++;
    event.target.style.backgroundColor = color;
}


function buildGrid(dim) {
    console.log(dim);
    const sketchBoard = document.querySelector("div.sketch-board");
    let row, square, i = 0, j = 0;
    for (i = 0; i < dim; i++) {
        row = document.createElement("div");
        row.classList.add("subrow");
        for (j = 0; j < dim; j++) {
            square = document.createElement("div");
            square.classList.add("square");
            square.addEventListener("mouseenter", _addColor_basic);
            row.appendChild(square);
        }
        sketchBoard.appendChild(row);
    }
}

function eraseAll(dim) {
    const N = dim * dim
    const squares = document.querySelectorAll(".square");
    let square;
    for (let i = 0; i < N; i++) {
        square = squares[i];
        square.style.backgroundColor="white";
    }
}

async function main() {

    buildGrid(16);
    const refreshButton = document.querySelector("#refresh");
    refreshButton.addEventListener("click", ()=> {
        location.reload();
    });
    await startProgram();
    const dim = parseInt(
        prompt("Enter the number of squares between 16 to 100" + 
        "per side for new grid (e.g, 69):")
    );
    if (dim < 16 || dim > 100) {
        alert("Number of grid enter is invalid. " +
        "Please re-start and enter a valid number");
        return EXIT_FAILURE;
    }
    // remove all child
    const sketchBoard = document.querySelector(".sketch-board");
    while(sketchBoard.firstChild) {
        sketchBoard.removeChild(sketchBoard.firstChild);
    }
    buildGrid(dim);
    const eraseButton = document.querySelector("#erase");
    eraseButton.addEventListener("click", () => {
        erase();
    });
    const eraseAllButton = document.querySelector("#erase-all");
    eraseAllButton.addEventListener("click", () => {
        eraseAll(dim);
    });
    const colorMixerButton = document.querySelector("#color-mixer");
    colorMixerButton.addEventListener("click", ()=> {
        console.log("mix button clicked");

        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.removeEventListener("mouseenter", _addColor_basic);
            square.addEventListener("mouseenter", _addColor_mix);
        });

    });
    const defaultButton = document.querySelector("#default");
    defaultButton.addEventListener("click", () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.removeEventListener("mouseenter", _addColor_mix);
            square.addEventListener("mouseenter", _addColor_basic);
        })
    });
    return EXIT_SUCESS;
}