let playerX = 0;
let playerY = 0;
let mouseZoomFx = false;
let cx = 0;
let cameraX = 0;
let cy = 0;
let cameraY = 0;
let playerSpeed = 5;
var fps;
var lastRenderTime = 0;
let dotuuid = 0;
let dots = [];
let dbAngleToMouse = 0;
function addDot(x, y, team) {
    dots.push(
        {
            uuid: dotuuid,
            x: x,
            y: y,
            team: team
        }
    );
    dotuuid++;
}
function deleteDot(id) {
    const index = dots.findIndex(dot => dot.uuid === id);
    if (index !== -1) {
        dots.splice(index, 1);
    }
}
gameLoop();
function gameLoop() {
    var now = performance.now();
    var deltaTime = now - lastRenderTime;
    lastRenderTime = now;
    fps = 1000 / deltaTime;
    //document.getElementById('fpsdisp').innerHTML = "FPS: " + Math.round(fps, 2);
    document.getElementById("ctx").style.width = '100%';
    document.getElementById("ctx").style.height = '100%';   

    ctx.clearRect(-0.5*c.width, 0.5*c.height, c.width, -c.height);
    dbAngleToMouse = angleTo(0,0,mouseX, mouseY);
    circleAt(0,0,12);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20* Math.cos(dbAngleToMouse), 20* Math.sin(dbAngleToMouse));
    ctx.stroke();
    //document.getElementById('ada').innerHTML = "angle: " + dbAngleToMouse;

    circleAt(20 + cameraX,-20 + cameraY,7);


    circleAt(0,0,12);
    controls();
    renderDotsLines();












    requestAnimationFrame(gameLoop);
}
function controls() {
    const handleMovement = (e) => {
        switch (e.key.toLowerCase()) {
            case 'a':
                playerX -= playerSpeed/fps;
                cx += playerSpeed/fps;
                break;
            case 'd':
                playerX += playerSpeed/fps;
                cx -= playerSpeed/fps;
                break;
            case 'w':
                playerY += playerSpeed/fps;
                cy -= playerSpeed/fps;
                break;
            case 's':
                playerY -= playerSpeed/fps;
                cy += playerSpeed/fps;
                break;
            case ' ':
                addDot(playerX, playerY, 1)
                break;
        }
    };
    window.addEventListener('keydown', handleMovement);

    playerX += (Math.cos(dbAngleToMouse)*playerSpeed)/fps;
    cx -= (Math.cos(dbAngleToMouse)*playerSpeed)/fps;
    playerY += (Math.sin(dbAngleToMouse)*playerSpeed)/fps;
    cy -= (Math.sin(dbAngleToMouse)*playerSpeed)/fps;


    if (mouseZoomFx == true) {
        cameraX = 0.01 * mouseX + cx;
        cameraY = 0.01 * mouseY + cy;
    } else {
        cameraX = cx;
        cameraY = cy;
    }
}
function renderDotsLines() {
    for(let i=0; i<dots.length; i++) {
        circleAt(dots[i].x + cameraX, dots[i].y + cameraY, 7)
    }
    for(let j=0; j<dots.length-1; j++) {
        ctx.beginPath();
        ctx.moveTo(dots[j].x + cameraX, dots[j].y + cameraY);
        ctx.lineTo(dots[j+1].x + cameraX, dots[j+1].y + cameraY);
        ctx.stroke();
    }
}