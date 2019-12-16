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
                this.y1 = this.y2 +20
                this.x3 = this.x2 +20
                this.y3 = this.y2 +20
                this.x4 = this.x2 +20
                this.y4 = this.y3 +20
                this.config = 1 
            } 
            else if (this.config == 1) {
                this.x1 = this.x2 +20
                this.y1 = this.y2 
                this.x3 = this.x2 +20
                this.y3 = this.y2 -20
                this.x4 = this.x3 +20
                this.y4 = this.y3  
                this.config = 0
            }
        }
        if (this.type == 5) {
            if (this.config == 0) {
                this.x1 = this.x2 
                this.y1 = this.y2 -20
                this.x3 = this.x2 -20
                this.y3 = this.y2 +20
                this.x4 = this.x2 -20
                this.y4 = this.y3 -20
                this.config = 1 
            } 
            else if (this.config == 1) {
                this.x1 = this.x2 +20
                this.y1 = this.y2 
                this.x3 = this.x2 +20
                this.y3 = this.y2 +20
                this.x4 = this.x3 +20
                this.y4 = this.y3  
                this.config = 0
            }
        }
    }
}


let rndPiece = 5 /*  Math.floor(Math.random() * 7); */
let p = []
p.push(new TetrisPiece(rndPiece));
p[p.length - 1].initPiece();




//ANIMATION CYCLE
function render() {
    //erases Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    p.forEach(function (piece) {
        piece.draw();

    });

    p[p.length - 1].update();
    console.log(upKey)

    if (p[p.length - 1].stopped) {
        rndPiece = Math.floor(Math.random() * 7);
        p.push(new TetrisPiece(rndPiece));
        p[p.length - 1].initPiece();
    }


}

window.setInterval(render, 500)


//handler for keydown
function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {

        if (p[p.length - 1].x1 <= 290 && p[p.length - 1].x2 <= 290 && p[p.length - 1].x3 <= 290 && p[p.length - 1].x4 <= 290) {
            p[p.length - 1].x1 += 20
            p[p.length - 1].x2 += 20
            p[p.length - 1].x3 += 20
            p[p.length - 1].x4 += 20
        }
    }
    if (e.key == 'ArrowLeft') {

        if (p[p.length - 1].x1 >= 20 && p[p.length - 1].x2 >= 20 && p[p.length - 1].x3 >= 20 && p[p.length - 1].x4 >= 20) {
            p[p.length - 1].x1 -= 20
            p[p.length - 1].x2 -= 20
            p[p.length - 1].x3 -= 20
            p[p.length - 1].x4 -= 20
        }
    }

    if (e.key == 'ArrowUp') {

        p[p.length - 1].rotate();

    }

    if (e.key == 'ArrowDown') {

        p[p.length - 1].y1 += 20
        p[p.length - 1].y2 += 20
        p[p.length - 1].y3 += 20
        p[p.length - 1].y4 += 20

    }

}

window.addEventListener('keydown', ArrowPressed);