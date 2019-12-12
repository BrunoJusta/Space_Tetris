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
        if (!this.stopped) {
            ctx.rect(this.x1, this.y1, squareSize, squareSize);
            ctx.rect(this.x2, this.y2, squareSize, squareSize)
            ctx.rect(this.x3, this.y3, squareSize, squareSize);
            ctx.rect(this.x4, this.y4, squareSize, squareSize);
        } else {
            ctx.rect(this.x1, 480, squareSize, squareSize);
            ctx.rect(this.x2, 480, squareSize, squareSize)
            ctx.rect(this.x3, 480, squareSize, squareSize);
            ctx.rect(this.x4, 480, squareSize, squareSize);
        }

        ctx.fill();
        ctx.stroke();




    }

    update() {
        this.y1 += 20;
        this.y2 += 20;
        this.y3 += 20;
        this.y4 += 20;

        if (this.y1 + 20 == H) {
            this.stopped = true; //flags icecream to stop
        }
        if (this.y2 + 20 == H) {
            this.stopped = true; //flags icecream to stop
        }
        if (this.y3 + 20 == H) {
            this.stopped = true; //flags icecream to stop
        }
        if (this.y4 + 20 == H) {
            this.stopped = true; //flags icecream to stop
        }
    }
}


let rndPiece = Math.floor(Math.random() * 7);
let p = []
p.push(new TetrisPiece(rndPiece));
p[p.length - 1].initPiece();





//ANIMATION CYCLE
function render() {
    //erases Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw icreams
    p.forEach(function (piece) {
        piece.draw();

    });

    p[p.length - 1].update();
    //draw on Canvas
    if (rightKey)
        x++; //UPDATE BALL
    if (leftKey)
        x--; //UPDATE BALL
    if (upKey)
        y--; //UPDATE BALL
    if (downKey)
        y++; //UPDATE BALL

    //new frame

}
window.setInterval(render, 300)


//handler for keydown
function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {
        //code here
        rightKey = true; //Canvas#2
    }
    if (e.key == 'ArrowLeft') {
        //code here
        leftKey = true; //Canvas#2
    }
    if (e.key == 'ArrowUp') {
        //code here
        upKey = true; //Canvas#2
    }
    if (e.key == 'ArrowDown') {
        //code here
        downKey = true; //Canvas#2
    }

}
//handler for keyup
function ArrowReleased(e) {
    if (e.key == 'ArrowRight')
        rightKey = false; //Canvas#2
    if (e.key == 'ArrowLeft')
        leftKey = false; //Canvas#2
    if (e.key == 'ArrowUp')
        upKey = false; //Canvas#2
    if (e.key == 'ArrowDown')
        downKey = false; //Canvas#2
}
//sets handlers for events keydown & keyup
window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);