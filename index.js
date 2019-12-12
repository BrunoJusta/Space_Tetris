//Canvas
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

//ball definitions
let x = 10;
let y = 100;
const raio = 10;
let rightKey = false; //only for Canvas#2
let leftKey = false;
let downKey = false;
let upKey = false;

//handler for keydown
function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {
        x++; //canvas 1: UPDATE BALL
        rightKey = true; //Canvas#2
    }
    if (e.key == 'ArrowLeft') {
        x--; //canvas 1: UPDATE BALL
        leftKey = true; //Canvas#2
    }
    if (e.key == 'ArrowUp') {
        y--; //canvas 1: UPDATE BALL
        upKey = true; //Canvas#2
    }
    if (e.key == 'ArrowDown') {
        y++; //canvas 1: UPDATE BALL
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

//ANIMATION CYCLE
function render() {
    //erases Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    
  
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.rect(x+100, y, 20, 20);
    ctx.rect(x+120, y, 20, 20);
    ctx.rect(x+140, y, 20, 20);
    ctx.rect(x+160, y, 20, 20);

    ctx.stroke();

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
    window.requestAnimationFrame(render);
}
render();