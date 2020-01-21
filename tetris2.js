//Canvas
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

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

//Variaveis eliminação
let deletedRow;
let deletedCounter;


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
                            document.querySelector("#wins").style.display = "block"
                            let win = document.getElementById('wins')
                            win.innerHTML = username2 + " " +  " WINS!"
                            points = 0
                            pointsTxt.innerHTML = points
                            lines = 0
                            linesTxt.innerHTML = lines
                            createdPieces = []
                          

                            points2 = 0
                            pointsTxt2.innerHTML = points
                            lines2 = 0
                            linesTxt2.innerHTML = lines
                            createdPieces2 = []

                      
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
let rndPiece = Math.floor(Math.random() * 7);
let createdPieces = []
createdPieces.push(new TetrisPiece(rndPiece));
createdPieces[createdPieces.length - 1].initPiece();


function playAgain(){
    document.querySelector(".gameover").style.display = "none"
    document.querySelector("#again").style.display = "none"
    document.querySelector("#wins").style.display = "none"
    createdPieces.push(new TetrisPiece(rndPiece));
    createdPieces[createdPieces.length - 1].initPiece();

    createdPieces2.push(new TetrisPiece2(rndPiece2));
    createdPieces2[createdPieces2.length - 1].initPiece2();
}

//Butão Play Again
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

/* ----------------------------------------------------------------------------------------------------------------------------------------- */


//Canvas 2
const canvas2 = document.querySelector("#myCanvas2");
const ctx2 = canvas2.getContext("2d");
const W2 = canvas2.width;
const H2 = canvas2.height;

//Arrays peças que já cairam 
let fallenPiecesY2 = []
let fallenPiecesX2 = []

//Pontuação
let pointsTxt2 = document.getElementById('points2')
let points2 = 0
pointsTxt2.innerHTML = points2

//frames
let frameCounter2 = 0;

//velocidade
let speed2 = 10

//lines
let linesTxt2 = document.getElementById('lines2')
let lines2 = 0 
linesTxt2.innerHTML = lines2

//Variaveis eliminação
let deletedRow2;
let deletedCounter2;


class TetrisPiece2 {
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

    initPiece2() {

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

    draw2() {

        ctx2.beginPath();
        ctx2.strokeStyle = "#181e3d";
        ctx2.fillStyle = this.color;
        ctx2.rect(this.x1, this.y1, squareSize, squareSize);
        ctx2.rect(this.x2, this.y2, squareSize, squareSize)
        ctx2.rect(this.x3, this.y3, squareSize, squareSize);
        ctx2.rect(this.x4, this.y4, squareSize, squareSize);
        ctx2.fill();
        ctx2.stroke();
    }

    update2() {

        //guarda no array as posições y
        fallenPiecesY2.push(this.y1)
        fallenPiecesY2.push(this.y2)
        fallenPiecesY2.push(this.y3)
        fallenPiecesY2.push(this.y4)

        //guarda no array as posições x
        fallenPiecesX2.push(this.x1)
        fallenPiecesX2.push(this.x2)
        fallenPiecesX2.push(this.x3)
        fallenPiecesX2.push(this.x4)

        //Se não for a primeira peça
        if (createdPieces2.length > 1) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < createdPieces2.length - 1; i++) {
                    //Colisões Y
                    if ((((fallenPiecesY2[j] + squareSize) == createdPieces2[i].y1 && fallenPiecesX2[j] == createdPieces2[i].x1) ||
                            ((fallenPiecesY2[j] + squareSize) == createdPieces2[i].y2 && fallenPiecesX2[j] == createdPieces2[i].x2) ||
                            ((fallenPiecesY2[j] + squareSize) == createdPieces2[i].y3 && fallenPiecesX2[j] == createdPieces2[i].x3) ||
                            ((fallenPiecesY2[j] + squareSize) == createdPieces2[i].y4 && fallenPiecesX2[j] == createdPieces2[i].x4)) && this.stopped != true) {

                        this.stopped = true
                        deleteRow2();
                        //Fim do jogo
                        if ((this.y1 < squareSize || this.y2 < squareSize || this.y3 < squareSize || this.y4 < squareSize)) {

                            document.querySelector(".gameover").style.display = "block"
                            document.querySelector("#again").style.display = "block"
                            document.querySelector("#wins").style.display = "block"
                            let win = document.getElementById('wins')
                            win.innerHTML = username + " " +  " WINS!"
                            points = 0
                            pointsTxt.innerHTML = points
                            lines = 0
                            linesTxt.innerHTML = lines
                            createdPieces = []
                          

                            points2 = 0
                            pointsTxt2.innerHTML = points
                            lines2 = 0
                            linesTxt2.innerHTML = lines
                            createdPieces2 = []
                        }
                    }
                    //Colisões X Left
                    if ((((fallenPiecesY2[j] + 40) == createdPieces2[i].y1 && fallenPiecesX2[j] == createdPieces2[i].x1 + squareSize) ||
                            ((fallenPiecesY2[j] + 40) == createdPieces2[i].y2 && fallenPiecesX2[j] == createdPieces2[i].x2 + squareSize) ||
                            ((fallenPiecesY2[j] + 40) == createdPieces2[i].y3 && fallenPiecesX2[j] == createdPieces2[i].x3 + squareSize) ||
                            ((fallenPiecesY2[j] + 40) == createdPieces2[i].y4 && fallenPiecesX2[j] == createdPieces2[i].x4 + squareSize)) && this.stopped != true) {

                        this.left = false
                    }
                    //Colisões X Right
                    if ((((fallenPiecesY2[j] + 40) == createdPieces2[i].y1 && fallenPiecesX2[j] == createdPieces2[i].x1 - squareSize) ||
                            ((fallenPiecesY2[j] + 40) == createdPieces2[i].y2 && fallenPiecesX2[j] == createdPieces2[i].x2 - squareSize) ||
                            ((fallenPiecesY2[j] + 40) == createdPieces2[i].y3 && fallenPiecesX2[j] == createdPieces2[i].x3 - squareSize) ||
                            ((fallenPiecesY2[j] + 40) == createdPieces2[i].y4 && fallenPiecesX2[j] == createdPieces2[i].x4 - squareSize)) && this.stopped != true) {

                        this.right = false
                    }
                    
                }
            }

            fallenPiecesY2 = []
            fallenPiecesX2 = []

        }
       
        //Colisão com o fim do canvas
        if ((this.y1 + squareSize == H2 || this.y2 + squareSize == H2 || this.y3 + squareSize == H2 || this.y4 + squareSize == H2) && this.stopped != true) {

            this.stopped = true;
            deleteRow2();
            fallenPiecesY2 = []
            fallenPiecesX2 = []

        }
        //Peça em andamento
        else if (this.stopped != true) {

            this.y1 += squareSize;
            this.y2 += squareSize;
            this.y3 += squareSize;
            this.y4 += squareSize;
            fallenPiecesY2 = []
            fallenPiecesX2 = []
        }
    }

    rotate2() {
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
let rndPiece2 = Math.floor(Math.random() * 7);
let createdPieces2 = []
createdPieces2.push(new TetrisPiece2(rndPiece2));
createdPieces2[createdPieces2.length - 1].initPiece2();



function deleteRow2() {

    for (let y = 490; y >= 10; y -= 20) {
        let lineCount = 0
        for (let x = 10; x <= 310; x += 20) {
            let pixel = ctx2.getImageData(x, y, 1, 1)
            let data = pixel.data
            let color = `rgba( ${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`
            if (color === "rgba( 0, 0, 0, 0)") {

            } else {
                lineCount += 1
                if (lineCount === 16) {
                    deletedCounter2++
                    deletedRow2 = y - 10
                    points2 += 100 * deletedCounter2
                    pointsTxt2.innerHTML = points2
                    lines2 += 1
                    linesTxt2.innerHTML = lines2



                    for (let g = 0; g < createdPieces2.length; g++) {
                        if (createdPieces2[g].y1 === y - 10) {
                            createdPieces2[g].x1 = -30

                        }
                        if (createdPieces2[g].y2 === y - 10) {
                            createdPieces2[g].x2 = -30

                        }
                        if (createdPieces2[g].y3 === y - 10) {
                            createdPieces2[g].x3 = -30

                        }
                        if (createdPieces2[g].y4 === y - 10) {
                            createdPieces2[g].x4 = -30

                        }
                    }
                    break
                }
            }
        }
    }
    fallAgain2();
    deletedRow2 = 0
    lineCount = 0
}

function fallAgain2() {

    for (let g = 0; g < createdPieces2.length; g++) {
        if (createdPieces2[g].y1 < deletedRow2) {
            createdPieces2[g].y1 += squareSize * deletedCounter2
        }
        if (createdPieces2[g].y2 < deletedRow2) {
            createdPieces2[g].y2 += squareSize * deletedCounter2
        }
        if (createdPieces2[g].y3 < deletedRow2) {
            createdPieces2[g].y3 += squareSize * deletedCounter2
        }
        if (createdPieces2[g].y4 < deletedRow2) {
            createdPieces2[g].y4 += squareSize * deletedCounter2
        }
    }
    deletedCounter2 = 0
}


//Prompt Play1
let username2 = prompt("Player 1 Username:");
if (username2 != null) {
  document.getElementById("username2").innerHTML = username2
}
//Prompt Play2
let username = prompt("Player 2 Username:");
if (username != null) {
  document.getElementById("username").innerHTML = username
}

/* ----------------------------------------------------------------------------------------------------------------------------------------- */

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

    frameCounter2++;

    if (frameCounter2 % speed2 == 0) {

        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        createdPieces2.forEach(function (piece) {
            piece.draw2();
        });
        createdPieces2[createdPieces2.length - 1].update2();
    }

    //Cria uma peça nova quando a outra para
    if (createdPieces2[createdPieces2.length - 1].stopped) {
        rndPiece2 = Math.floor(Math.random() * 7);
        createdPieces2.push(new TetrisPiece2(rndPiece2));
        createdPieces2[createdPieces2.length - 1].initPiece2();
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

    if(event.code == 'KeyA'){
        if (createdPieces2[createdPieces2.length - 1].left) {
            if (createdPieces2[createdPieces2.length - 1].x1 >= 20 && createdPieces2[createdPieces2.length - 1].x2 >= 20 &&
                createdPieces2[createdPieces2.length - 1].x3 >= 20 && createdPieces2[createdPieces2.length - 1].x4 >= 20) {
                createdPieces2[createdPieces2.length - 1].x1 -= squareSize
                createdPieces2[createdPieces2.length - 1].x2 -= squareSize
                createdPieces2[createdPieces2.length - 1].x3 -= squareSize
                createdPieces2[createdPieces2.length - 1].x4 -= squareSize
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                createdPieces2.forEach(function (piece) {
                    piece.draw2();
                });
            }
        }
    }

    if(event.code == 'KeyD'){
        if (createdPieces2[createdPieces2.length - 1].right) {
            if (createdPieces2[createdPieces2.length - 1].x1 <= 290 && createdPieces2[createdPieces2.length - 1].x2 <=
                290 && createdPieces2[createdPieces2.length - 1].x3 <= 290 && createdPieces2[createdPieces2.length - 1].x4 <= 290) {
                createdPieces2[createdPieces2.length - 1].x1 += squareSize
                createdPieces2[createdPieces2.length - 1].x2 += squareSize
                createdPieces2[createdPieces2.length - 1].x3 += squareSize
                createdPieces2[createdPieces2.length - 1].x4 += squareSize
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                createdPieces2.forEach(function (piece) {
                    piece.draw2();
                });
            }
        }
    }

    if (event.code == 'KeyW') {
        createdPieces2[createdPieces2.length - 1].rotate2();
    }

    if (event.code == 'KeyS') {
        speed2 = 2
    }

}

//handler for keydown
function ArrowReleased(e) {

    if (e.key == 'ArrowDown') {
        speed = 10
    }

    if (event.code == 'KeyS') {
        speed2 = 10
    }

}



window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);
window.setInterval(render, 40);