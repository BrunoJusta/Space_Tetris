//Canvas
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

//Teclas
let rightKey = false;
let leftKey = false;
let downKey = false;
let upKey = false;

//Variáveis Peças
const squareSize = 20;
let initialPos = 0

//Arrays peças que já cairam
let fallenPiecesY = []
let fallenPiecesX = []

//Pontuação
let pointsTxt = document.getElementById('points')
let points = 0
pointsTxt.innerHTML = points

//frames
let frameCounter = 0;

//velocidade
let speed = 10

//lines
let linesTxt = document.getElementById('lines')
let lines = 0 
linesTxt.innerHTML = lines




class TetrisPiece {
    constructor(type) {
        this.x1 = 0
        this.y1 = 0
        this.x2 = 0
        this.y2 = 0
        this.x3 = 0
        this.y3 = 0
        this.x4 = 0
        this.y4 = 0
        this.type = type;
        this.config = 0;
        this.stopped = false;
        this.color = ""
        this.left = true
        this.right = true
    }

    initPiece() {

        switch (this.type) {
            case 0:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2 + squareSize
                this.y3 = initialPos
                this.x4 = this.x3 + squareSize
                this.y4 = initialPos
                this.color = "#145C9E"
                break;

            case 1:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2 + squareSize
                this.y3 = initialPos
                this.x4 = this.x3
                this.y4 = initialPos + squareSize
                this.color = "#ab5ad1"
                break;

            case 2:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2 + squareSize
                this.y3 = initialPos
                this.x4 = this.x1
                this.y4 = initialPos + squareSize
                this.color = "#F15025"
                break;

            case 3:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x1
                this.y3 = initialPos + squareSize
                this.x4 = this.x2
                this.y4 = initialPos + squareSize
                this.color = "#AAD922"
                break;

            case 4:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2
                this.y3 = initialPos - squareSize
                this.x4 = this.x2 + squareSize
                this.y4 = initialPos - squareSize
                this.color = "#fcba03"
                break;

            case 5:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2
                this.y3 = initialPos + squareSize
                this.x4 = this.x2 + squareSize
                this.y4 = initialPos + squareSize
                this.color = "#D8315B"
                break;

            case 6:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2 + squareSize
                this.y3 = initialPos
                this.x4 = this.x2
                this.y4 = initialPos + squareSize
                this.color = "#3DD6D0"
                break;

            default:
                break;
        }
    }

    draw() {

        ctx.beginPath();
        ctx.strokeStyle = "#181e3d";
        ctx.fillStyle = this.color;
        ctx.rect(this.x1, this.y1, squareSize, squareSize);
        ctx.rect(this.x2, this.y2, squareSize, squareSize)
        ctx.rect(this.x3, this.y3, squareSize, squareSize);
        ctx.rect(this.x4, this.y4, squareSize, squareSize);
        ctx.fill();
        ctx.stroke();
    }

    update() {

        //guarda no array as posições y
        fallenPiecesY.push(this.y1)
        fallenPiecesY.push(this.y2)
        fallenPiecesY.push(this.y3)
        fallenPiecesY.push(this.y4)

        //guarda no array as posições x
        fallenPiecesX.push(this.x1)
        fallenPiecesX.push(this.x2)
        fallenPiecesX.push(this.x3)
        fallenPiecesX.push(this.x4)

        //Se não for a primeira peça
        if (createdPieces.length > 1) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < createdPieces.length - 1; i++) {
                    //Colisões Y
                    if ((((fallenPiecesY[j] + squareSize) == createdPieces[i].y1 && fallenPiecesX[j] == createdPieces[i].x1) ||
                            ((fallenPiecesY[j] + squareSize) == createdPieces[i].y2 && fallenPiecesX[j] == createdPieces[i].x2) ||
                            ((fallenPiecesY[j] + squareSize) == createdPieces[i].y3 && fallenPiecesX[j] == createdPieces[i].x3) ||
                            ((fallenPiecesY[j] + squareSize) == createdPieces[i].y4 && fallenPiecesX[j] == createdPieces[i].x4)) && this.stopped != true) {

                        this.stopped = true
                        deleteRow();
                        //Fim do jogo
                        if ((this.y1 < squareSize || this.y2 < squareSize || this.y3 < squareSize || this.y4 < squareSize)) {

                            document.querySelector(".gameover").style.display = "block"
                            document.querySelector("#again").style.display = "block"
                         


                            points = 0
                            pointsTxt.innerHTML = points
                            lines = 0
                            linesTxt.innerHTML = lines
                            createdPieces = []
                            
                           
                        }
                    }
                    //Colisões X Left
                    if ((((fallenPiecesY[j] + 40) == createdPieces[i].y1 && fallenPiecesX[j] == createdPieces[i].x1 + squareSize) ||
                            ((fallenPiecesY[j] + 40) == createdPieces[i].y2 && fallenPiecesX[j] == createdPieces[i].x2 + squareSize) ||
                            ((fallenPiecesY[j] + 40) == createdPieces[i].y3 && fallenPiecesX[j] == createdPieces[i].x3 + squareSize) ||
                            ((fallenPiecesY[j] + 40) == createdPieces[i].y4 && fallenPiecesX[j] == createdPieces[i].x4 + squareSize)) && this.stopped != true) {

                        this.left = false
                    }
                    //Colisões X Right
                    if ((((fallenPiecesY[j] + 40) == createdPieces[i].y1 && fallenPiecesX[j] == createdPieces[i].x1 - squareSize) ||
                            ((fallenPiecesY[j] + 40) == createdPieces[i].y2 && fallenPiecesX[j] == createdPieces[i].x2 - squareSize) ||
                            ((fallenPiecesY[j] + 40) == createdPieces[i].y3 && fallenPiecesX[j] == createdPieces[i].x3 - squareSize) ||
                            ((fallenPiecesY[j] + 40) == createdPieces[i].y4 && fallenPiecesX[j] == createdPieces[i].x4 - squareSize)) && this.stopped != true) {

                        this.right = false
                    }
                    
                }
            }

            fallenPiecesY = []
            fallenPiecesX = []

        }
       
        //Colisão com o fim do canvas
        if ((this.y1 + squareSize == H || this.y2 + squareSize == H || this.y3 + squareSize == H || this.y4 + squareSize == H) && this.stopped != true) {

            this.stopped = true;
            deleteRow();
            fallenPiecesY = []
            fallenPiecesX = []

        }
        //Peça em andamento
        else if (this.stopped != true) {

            this.y1 += squareSize;
            this.y2 += squareSize;
            this.y3 += squareSize;
            this.y4 += squareSize;
            fallenPiecesY = []
            fallenPiecesX = []
        }
    }

    rotate() {
        if (this.type == 0) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - squareSize
                this.x3 = this.x2
                this.y3 = this.y2 + squareSize
                this.x4 = this.x2
                this.y4 = this.y2 + squareSize * 2
                this.config = 1
            } else {

                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x2 + squareSize * 2
                this.y4 = this.y2
                this.config = 0

            }
        }
        if (this.type == 1) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - squareSize
                this.x3 = this.x2
                this.y3 = this.y2 + squareSize
                this.x4 = this.x3 - squareSize
                this.y4 = this.y3
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x1
                this.y4 = this.y2 - squareSize
                this.config = 2

            } else if (this.config == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - squareSize
                this.x3 = this.x2
                this.y3 = this.y2 + squareSize
                this.x4 = this.x3 + squareSize
                this.y4 = this.y1
                this.config = 3

            } else if (this.config == 3) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2 
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2 
                this.x4 = this.x3 
                this.y4 = this.y1 + squareSize
                this.config = 0

            }
        }
        if (this.type == 2) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - squareSize
                this.x3 = this.x2
                this.y3 = this.y2 + squareSize
                this.x4 = this.x3 - squareSize
                this.y4 = this.y1
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x3
                this.y4 = this.y1 - squareSize
                this.config = 2

            } else if (this.config == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - squareSize
                this.x3 = this.x2
                this.y3 = this.y2 + squareSize
                this.x4 = this.x3 + squareSize
                this.y4 = this.y3
                this.config = 3

            }
            else if (this.config == 3) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2 
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2 
                this.x4 = this.x1 
                this.y4 = this.y1 + squareSize
                this.config = 0

            }
        }
        if (this.type == 4) {
            if (this.config == 0) {
                this.x2 = this.x1
                this.y2 = this.y1 - squareSize
                this.x3 = this.x1 + squareSize
                this.y3 = this.y2 + squareSize
                this.x4 = this.x1 + squareSize
                this.y4 = this.y3 + squareSize
                this.config = 1
            } else if (this.config == 1) {
                this.x2 = this.x1 + squareSize
                this.y2 = this.y1
                this.x3 = this.x1 + squareSize
                this.y3 = this.y2 - squareSize
                this.x4 = this.x3 + squareSize
                this.y4 = this.y3
                this.config = 0
            }
        }
        if (this.type == 5) {
            if (this.config == 0) {
                this.x2 = this.x1
                this.y2 = this.y1 + squareSize
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2 - squareSize
                this.x4 = this.x3 
                this.y4 = this.y3 - squareSize
                this.config = 1
            } else if (this.config == 1) {
                this.x2 = this.x1 + squareSize
                this.y2 = this.y1
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2 + squareSize
                this.x4 = this.x3 - squareSize
                this.y4 = this.y3
                this.config = 0
            }
        }
        if (this.type == 6) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - squareSize
                this.x3 = this.x2
                this.y3 = this.y2 + squareSize
                this.x4 = this.x2 - squareSize
                this.y4 = this.y2
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x2
                this.y4 = this.y2 - squareSize
                this.config = 2
            } else if (this.config == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - squareSize
                this.x3 = this.x2
                this.y3 = this.y2 + squareSize
                this.x4 = this.x2 + squareSize
                this.y4 = this.y2
                this.config = 3
            } else if (this.config == 3) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x2
                this.y4 = this.y2 + squareSize
                this.config = 0
            }
        }
    }
}


//Criação das peças
let rndPiece = 6 /* Math.floor(Math.random() * 7); */
let createdPieces = []
createdPieces.push(new TetrisPiece(rndPiece));
createdPieces[createdPieces.length - 1].initPiece();

//Variaveis eliminação
let deletedRow;
let deletedCounter;

function playAgain(){
    document.querySelector(".gameover").style.display = "none"
    document.querySelector("#again").style.display = "none"
    createdPieces.push(new TetrisPiece(rndPiece));
    createdPieces[createdPieces.length - 1].initPiece();
}


let el = document.getElementById('again');
if (el.addEventListener)
    el.addEventListener("click", playAgain, false);
else if (el.attachEvent)
    el.attachEvent('onclick', playAgain);


function deleteRow() {

    for (let y = 490; y >= 10; y -= 20) {
        let lineCount = 0
        for (let x = 10; x <= 310; x += 20) {
            let pixel = ctx.getImageData(x, y, 1, 1)
            let data = pixel.data
            let color = `rgba( ${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`
            if (color === "rgba( 0, 0, 0, 0)") {

            } else {
                lineCount += 1
                if (lineCount === 16) {
                    deletedCounter++
                    deletedRow = y - 10
                    points += 100 * deletedCounter
                    pointsTxt.innerHTML = points
                    lines += 1
                    linesTxt.innerHTML = lines



                    for (let g = 0; g < createdPieces.length; g++) {
                        if (createdPieces[g].y1 === y - 10) {
                            createdPieces[g].x1 = -30

                        }
                        if (createdPieces[g].y2 === y - 10) {
                            createdPieces[g].x2 = -30

                        }
                        if (createdPieces[g].y3 === y - 10) {
                            createdPieces[g].x3 = -30

                        }
                        if (createdPieces[g].y4 === y - 10) {
                            createdPieces[g].x4 = -30

                        }
                    }
                    break
                }
            }
        }
    }
    fallAgain();
    deletedRow = 0
    lineCount = 0
}

function fallAgain() {

    for (let g = 0; g < createdPieces.length; g++) {
        if (createdPieces[g].y1 < deletedRow) {
            createdPieces[g].y1 += squareSize * deletedCounter
        }
        if (createdPieces[g].y2 < deletedRow) {
            createdPieces[g].y2 += squareSize * deletedCounter
        }
        if (createdPieces[g].y3 < deletedRow) {
            createdPieces[g].y3 += squareSize * deletedCounter
        }
        if (createdPieces[g].y4 < deletedRow) {
            createdPieces[g].y4 += squareSize * deletedCounter
        }
    }
    deletedCounter = 0
}

let username = prompt("Username:");

if (username != null) {
  document.getElementById("username").innerHTML = username
}

//ANIMATION CYCLE
function render() {


    frameCounter++;

    if (frameCounter % speed == 0) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createdPieces.forEach(function (piece) {
            piece.draw();
        });
        createdPieces[createdPieces.length - 1].update();
    }

    //Cria uma peça nova quando a outra para
    if (createdPieces[createdPieces.length - 1].stopped) {
        rndPiece = Math.floor(Math.random() * 7);
        createdPieces.push(new TetrisPiece(rndPiece));
        createdPieces[createdPieces.length - 1].initPiece();
    }


}



//handler for keydown
function ArrowPressed(e) {

    if (e.key == 'ArrowRight') {
        if (createdPieces[createdPieces.length - 1].right) {
            if (createdPieces[createdPieces.length - 1].x1 <= 290 && createdPieces[createdPieces.length - 1].x2 <=
                290 && createdPieces[createdPieces.length - 1].x3 <= 290 && createdPieces[createdPieces.length - 1].x4 <= 290) {
                createdPieces[createdPieces.length - 1].x1 += squareSize
                createdPieces[createdPieces.length - 1].x2 += squareSize
                createdPieces[createdPieces.length - 1].x3 += squareSize
                createdPieces[createdPieces.length - 1].x4 += squareSize
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                createdPieces.forEach(function (piece) {
                    piece.draw();
                });
            }
        }
    }

    if (e.key == 'ArrowLeft') {

        if (createdPieces[createdPieces.length - 1].left) {
            if (createdPieces[createdPieces.length - 1].x1 >= 20 && createdPieces[createdPieces.length - 1].x2 >= 20 &&
                createdPieces[createdPieces.length - 1].x3 >= 20 && createdPieces[createdPieces.length - 1].x4 >= 20) {
                createdPieces[createdPieces.length - 1].x1 -= squareSize
                createdPieces[createdPieces.length - 1].x2 -= squareSize
                createdPieces[createdPieces.length - 1].x3 -= squareSize
                createdPieces[createdPieces.length - 1].x4 -= squareSize
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                createdPieces.forEach(function (piece) {
                    piece.draw();
                });
            }
        }
    }

    if (e.key == 'ArrowUp') {

        createdPieces[createdPieces.length - 1].rotate();

    }

    if (e.key == 'ArrowDown') {

        speed = 2

    }

}

//handler for keydown
function ArrowReleased(e) {

    if (e.key == 'ArrowDown') {
        speed = 10
    }

}

window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);
window.setInterval(render, 40);