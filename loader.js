var c = document.getElementById("ctx");
var ctx = c.getContext("2d");
const resolutionMultiplier = 2.4;
var displayWidth = window.innerWidth;
var displayHeight = window.innerHeight;

c.style.width = displayWidth + 'px';
c.style.height = displayHeight + 'px';
c.width = displayWidth * resolutionMultiplier;
c.height = displayHeight * resolutionMultiplier;

// Apply scaling to match the higher internal resolution
ctx.scale(resolutionMultiplier, resolutionMultiplier);

// Flip the Y-axis
ctx.transform(1, 0, 0, -1, 0, displayHeight);

// Translate to the canvas center
ctx.translate(displayWidth / 2, displayHeight / 2);

// Track mouse position
let zoom = 1;
let mouseX;
let mouseY;

document.addEventListener('mousemove', function (e) {
    const rect = c.getBoundingClientRect(); // Get canvas position and size
    // Adjust for scaling factor by dividing by resolutionMultiplier
    mouseX = (e.clientX - rect.left - displayWidth / 2) / resolutionMultiplier; 
    mouseY = -(e.clientY - rect.top - displayHeight / 2) / resolutionMultiplier; 
    //document.getElementById("xy").innerHTML = "mouse: " + mouseX + ", " + mouseY;
});

function circleAt(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}
function angleTo(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}



const toolbar = document.getElementById("tools");
const toolbar_drag = document.getElementById("tools-drag");
toolbar_drag.style.width = toolbar.style.width;

let isDragging = false;
let offsetX, offsetY;

toolbar_drag.addEventListener('mousedown', (e) => {
    isDragging = true;
    toolbar_drag.style.cursor = 'grabbing';
    
    // Calculate the offset between the mouse position and the top-left corner of the div
    offsetX = e.clientX - toolbar_drag.getBoundingClientRect().left;
    offsetY = e.clientY - toolbar_drag.getBoundingClientRect().top;
    
    // Prevent text selection while dragging
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
    // Move the div to the new mouse position adjusted by the offset
    toolbar_drag.style.left = (e.clientX - offsetX) + 'px';
    toolbar_drag.style.top = (e.clientY - offsetY) + 'px';
    toolbar.style.left = toolbar_drag.style.left;
    toolbar.style.top = (e.clientY - offsetY + 20) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    toolbar_drag.style.cursor = 'grab';
});
