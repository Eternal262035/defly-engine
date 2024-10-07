let playerX = 0;
let playerY = 0;
let mouseZoomFx = false;
let cx = 0;
let cameraX = 0;
let cy = 0;
let cameraY = 0;
let playerSpeed = 300;
var fps;
var lastRenderTime = 0;
let dotuuid = 0;
let dots = [];
let dotPlaceCooldown = 0;
let dbAngleToMouse = 0;
let lastDotUuid;
let lines = [];
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
function addLine(uuidFrom, uuidTo) {
    lines.push([
        uuidFrom,
        uuidTo
    ]);
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
    document.getElementById('fpsdisp').innerHTML = "FPS: " + Math.round(fps, 2);
    document.getElementById("ctx").style.width = '100%';
    document.getElementById("ctx").style.height = '100%';   

    ctx.clearRect(-0.5*c.width, 0.5*c.height, c.width, -c.height);
    dbAngleToMouse = angleTo(0,0,mouseX, mouseY);
    circleAt(0,0,12);
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.moveTo(0, 0);
    ctx.lineTo(20* Math.cos(dbAngleToMouse), 20* Math.sin(dbAngleToMouse));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, 2 * Math.PI*dotPlaceCooldown/0.3);
    ctx.stroke();
    //document.getElementById('ada').innerHTML = "angle: " + dbAngleToMouse;
    circleAt(20 + cameraX,-20 + cameraY,7);
    circleAt(0,0,12);


    if (dotPlaceCooldown >= 0) {
        dotPlaceCooldown -= (1/0.4)/fps; 
    }


    controls();
    renderDotsLines();












    requestAnimationFrame(gameLoop);
}
function controls() {


/*playerX += (Math.cos(dbAngleToMouse)*playerSpeed)/fps;
    cx -= (Math.cos(dbAngleToMouse)*playerSpeed)/fps;
    playerY += (Math.sin(dbAngleToMouse)*playerSpeed)/fps;
    cy -= (Math.sin(dbAngleToMouse)*playerSpeed)/fps; */


    if (mouseZoomFx == true) {
        cameraX = 0.01 * mouseX + cx;
        cameraY = 0.01 * mouseY + cy;
    } else {
        cameraX = cx;
        cameraY = cy;
    }
}
window.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() == 'a') {
        playerX -= playerSpeed/fps;
        cx += playerSpeed/fps;
    }
    if (e.key.toLowerCase() == 'd') {
        playerX += playerSpeed/fps;
        cx -= playerSpeed/fps;
    }
    if (e.key.toLowerCase() == 'w') {
        playerY += playerSpeed/fps;
        cy -= playerSpeed/fps;
    }
    if (e.key.toLowerCase() == 's') {
        playerY -= playerSpeed/fps;
        cy += playerSpeed/fps;
    }
    if (e.key.toLowerCase() == ' ') {
        if (dotPlaceCooldown <= 0) {
            dotPlaceCooldown = 0.4;
            addDot(playerX, playerY, 1);
            lastDotUuid = dotuuid;
            addLine(lastDotUuid-1, lastDotUuid); //alter this when just line connecting without dot placing; maybe use LastDotTouched instead of lastDotPlaced. 
            console.log("placed dot!")
        }
    }
});
function renderDotsLines() {
    console.log(dots.find(dots => dots.uuid === lines[0][0]));
    for(let j=0; j<dots.length-1; j++) {
        ctx.beginPath();
        ctx.lineWidth = 9;
        ctx.moveTo(dots.find(dots => dots.uuid === lines[j][0]).x + cameraX, dots.find(dots => dots.uuid === lines[j][1]).y + cameraY);
        ctx.lineTo(dots.find(dots => dots.uuid === lines[j+1][0]).x + cameraX, dots.find(dots => dots.uuid === lines[j+1][1]).y + cameraY);
        ctx.strokeStyle = colors.playerTeamBorder;
        ctx.stroke();
        ctx.lineWidth = 5.5;
        ctx.strokeStyle = colors.playerTeamFill;
        ctx.stroke();
    }
    for(let i=0; i<dots.length; i++) {
        circleAt(dots[i].x + cameraX, dots[i].y + cameraY, 7);
        draw('dot', dots[i].x + cameraX, dots[i].y + cameraY, 0, {size: 7});
    }
}