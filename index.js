//Canvas
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;
const squareSize = 20;
let initialPos = 0

let rightKey = false;
let leftKey = false;
let downKey = false;
let upKey = false;

let rotation = 0

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
        this.config = rotation;
        this.stopped = false;
        this.color = ""
    }

    initPiece() {

        console.log(this.type)
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
                this.y4 = initialPos + 20
                this.color = "#631D76"
                break;

            case 2:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2 + squareSize
                this.y3 = initialPos
                this.x4 = this.x1
                this.y4 = initialPos + 20
                this.color = "#F15025"
                break;

            case 3:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x1
                this.y3 = initialPos + 20
                this.x4 = this.x2
                this.y4 = initialPos + 20
                this.color = "#AAD922"
                break;

            case 4:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2
                this.y3 = initialPos - 20
                this.x4 = this.x2 + squareSize
                this.y4 = initialPos - 20
                this.color = "#FBFF12"
                break;

            case 5:
                this.x1 = W / 2 - squareSize * 2
                this.y1 = initialPos
                this.x2 = this.x1 + squareSize
                this.y2 = initialPos
                this.x3 = this.x2
                this.y3 = initialPos + 20
                this.x4 = this.x2 + squareSize
                this.y4 = initialPos + 20
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
                this.y4 = initialPos + 20
                this.color = "#3DD6D0"
                break;

            default:
                break;


        }
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = this.color;
        ctx.rect(this.x1, this.y1, squareSize, squareSize);
        ctx.rect(this.x2, this.y2, squareSize, squareSize)
        ctx.rect(this.x3, this.y3, squareSize, squareSize);
        ctx.rect(this.x4, this.y4, squareSize, squareSize);
        ctx.fill();
        ctx.stroke();




    }

    update() {

        if (this.y1 + 20 == H || this.y2 + 20 == H || this.y3 + 20 == H || this.y4 + 20 == H) {

            this.stopped = true;

        } else {
      
            this.y1 += 20;
            this.y2 += 20;
            this.y3 += 20;
            this.y4 += 20;
        }
        
    }

    rotate() {
        if (this.type == 0) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2
                this.y3 = this.y2 + 20
                this.x4 = this.x2
                this.y4 = this.y2 + 40
                this.config = 1
            } else {

                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x2 + 2 * squareSize
                this.y4 = this.y2
                this.config = 0

            }
        }
        if (this.type == 1) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2
                this.y3 = this.y2 + 20
                this.x4 = this.x3 - 20
                this.y4 = this.y3
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x1
                this.y4 = this.y2 - 20
                this.config = 2

            } else if (this.config == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2
                this.y3 = this.y2 + 20
                this.x4 = this.x3 + 20
                this.y4 = this.y1
                this.config = 0

            }
        }
        if (this.type == 2) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2
                this.y3 = this.y2 + 20
                this.x4 = this.x3 - 20
                this.y4 = this.y1
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x3
                this.y4 = this.y1 - 20
                this.config = 2

            } else if (this.config == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2
                this.y3 = this.y2 + 20
                this.x4 = this.x3 + 20
                this.y4 = this.y3
                this.config = 0

            }
        }
        if (this.type == 4) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 + 20
                this.x3 = this.x2 + 20
                this.y3 = this.y2 + 20
                this.x4 = this.x2 + 20
                this.y4 = this.y3 + 20
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 + 20
                this.y1 = this.y2
                this.x3 = this.x2 + 20
                this.y3 = this.y2 - 20
                this.x4 = this.x3 + 20
                this.y4 = this.y3
                this.config = 0
            }
        }
        if (this.type == 5) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2 - 20
                this.y3 = this.y2 + 20
                this.x4 = this.x2 - 20
                this.y4 = this.y3 - 20
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 + 20
                this.y1 = this.y2
                this.x3 = this.x2 + 20
                this.y3 = this.y2 + 20
                this.x4 = this.x3 + 20
                this.y4 = this.y3
                this.config = 0
            }
        }
        if (this.type == 6) {
            if (this.config == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2
                this.y3 = this.y2 + 20
                this.x4 = this.x2 - 20
                this.y4 = this.y2
                this.config = 1
            } else if (this.config == 1) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x2
                this.y4 = this.y2 - 20
                this.config = 2
            } else if (this.config == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - 20
                this.x3 = this.x2
                this.y3 = this.y2 + 20
                this.x4 = this.x2 + 20
                this.y4 = this.y2
                this.config = 3
            } else if (this.config == 3) {
                this.x1 = this.x2 - squareSize
                this.y1 = this.y2
                this.x3 = this.x2 + squareSize
                this.y3 = this.y2
                this.x4 = this.x2
                this.y4 = this.y2 + 20
                this.config = 0
            }
        }
    }
}


let rndPiece = Math.floor(Math.random() * 7);
let createdPieces = []
createdPieces.push(new TetrisPiece(rndPiece));
createdPieces[createdPieces.length - 1].initPiece();




//ANIMATION CYCLE
let frameCounter = 0;
let moveRight = false;
let moveLeft = false;
var pp = 0;
let s = 10




function render() {




    frameCounter++;

    if (frameCounter % s == 0) {
        //erases Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        /* for (var x = 0; x <= W; x += 20) {
            ctx.moveTo(0.5 + x + pp, pp);
            ctx.lineTo(0.5 + x + pp, H + pp);
        }
        
        for (var x = 0; x <= H; x += 20) {
            ctx.moveTo(pp, 0.5 + x + pp);
            ctx.lineTo(W + pp, 0.5 + x + pp);
        }
        ctx.strokeStyle = "white";
        ctx.stroke(); */

        createdPieces.forEach(function (piece) {
            piece.draw();
        });
        createdPieces[createdPieces.length - 1].update();
    }


    if (createdPieces[createdPieces.length - 1].stopped) {
        rndPiece = Math.floor(Math.random() * 7);
        createdPieces.push(new TetrisPiece(rndPiece));
        createdPieces[createdPieces.length - 1].initPiece();
    }


}

window.setInterval(render, 50)

/* let pixel = ctx.getImageData(x, y, 1, 1)
let data = pixel.data
let cor = `rgba( ${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})` */


//handler for keydown
function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {

        if (createdPieces[createdPieces.length - 1].x1 <= 290 && createdPieces[createdPieces.length - 1].x2 <= 290 && createdPieces[createdPieces.length - 1].x3 <= 290 && createdPieces[createdPieces.length - 1].x4 <= 290) {
            moveRight = true;
            createdPieces[createdPieces.length - 1].x1 += 20
            createdPieces[createdPieces.length - 1].x2 += 20
            createdPieces[createdPieces.length - 1].x3 += 20
            createdPieces[createdPieces.length - 1].x4 += 20
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            createdPieces.forEach(function (piece) {
                piece.draw();
            });
        }
    }
    if (e.key == 'ArrowLeft') {

        if (createdPieces[createdPieces.length - 1].x1 >= 20 && createdPieces[createdPieces.length - 1].x2 >= 20 && createdPieces[createdPieces.length - 1].x3 >= 20 && createdPieces[createdPieces.length - 1].x4 >= 20) {
            moveLeft = true;
            createdPieces[createdPieces.length - 1].x1 -= 20
            createdPieces[createdPieces.length - 1].x2 -= 20
            createdPieces[createdPieces.length - 1].x3 -= 20
            createdPieces[createdPieces.length - 1].x4 -= 20
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            createdPieces.forEach(function (piece) {
                piece.draw();
            });
        }
    }

    if (e.key == 'ArrowUp') {

        createdPieces[createdPieces.length - 1].rotate();

    }

    if (e.key == 'ArrowDown') {

        s = 2

    }

}


//handler for keydown
function ArrowReleased(e) {

    if (e.key == 'ArrowDown') {

        s = 10

    }

}
window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);