var c = document.getElementById("ctx");
var ctx = c.getContext("2d");
const resolutionMultiplier = 1; //making this any larger messes up the coords system sigh
var displayWidth = window.innerWidth;
var displayHeight = window.innerHeight;



c.style.width = displayWidth + 'px';
c.style.height = displayHeight + 'px';
c.width = displayWidth * resolutionMultiplier;
c.height = displayHeight * resolutionMultiplier;

// Apply scaling to match the higher internal resolution
ctx.scale(resolutionMultiplier, resolutionMultiplier);

ctx.transform(1, 0, 0, -1, 0, displayHeight);


ctx.translate(window.innerWidth/2, window.innerHeight/2);
ctx.imageSmoothingEnabled = true;
document.getElementById("disconnect").style.display="none";
var disconnected = 0;
let zoom = 1;
let mouseX;
let mouseY;
document.addEventListener('mousemove', function(e) {
    const rect = c.getBoundingClientRect(); // Get canvas position and size
    mouseX = e.clientX - rect.left - c.width / 2; // Calculate X relative to the canvas center
    mouseY = -(e.clientY - rect.top - c.height / 2); // Calculate Y relative to canvas center with flipped axis
    //document.getElementById("xy").innerHTML = "mouse: " + mouseX + ", " + mouseY;
});
function circleAt(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}
function angleTo(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}








