// Start of code

// get references to the canvas and context
let canvas = document.getElementById("canvas");
let overlay = document.getElementById("overlay");
let ctx = canvas.getContext("2d");
let ctxo = overlay.getContext("2d");

// style the context -- this can be extended to using variable colors and line widths
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctxo.strokeStyle = "blue";
ctxo.lineWidth = 3;

// Getting the location of the canvas in the browser
let canvasOffset = canvas.getBoundingClientRect();
let offsetX = canvasOffset.left;
let offsetY = canvasOffset.top;
let scrollY = canvas.scrollTop;

// Flag to check if the mouse has been clicked
let isDown = false;

// Placeholders to keep note of the mouse start positions when user starts to draw
let startX;
let startY;

let prevStartX = 0;
let prevStartY = 0;

let prevWidth  = 0;
let prevHeight = 0;

// Variable to hold the shape information
let shape = 'circle';


/**
 * This function is triggered when the user clicks on the canvas
 * @param {Event} e 
 */
function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // set a flag indicating the drag action has started
    isDown = true;
}

/**
 * This function is triggered when the user stops clicking the drag
 * This is where the 
 * @param {Event} e 
 */
function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
    
    // Getting the current location of the mouse pointer when the user stopped 
    // dragging
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // We trigger the shape draw function based on the selected shape
    if(shape == "rect"){
        
        ctxo.strokeRect(prevStartX, prevStartY, prevWidth, prevHeight);

    } else {
        
    
        ctxo.beginPath();
        ctxo.moveTo(startX, startY + (mouseY - startY) / 2);
        ctxo.bezierCurveTo(startX, startY, mouseX, startY, mouseX, startY + (mouseY - startY) / 2);
        ctxo.bezierCurveTo(mouseX, mouseY, startX, mouseY, startX, startY + (mouseY - startY) / 2);
        ctxo.closePath();
        ctxo.stroke();
    }

    

}

/**
 * Event handler when mouse is moved out of the canvas
 * @param {Event} e 
 */
function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
}

/**
 * This function takes in the x and y positions and draws an ellipse 
 * at that position
 * @param {number} x 
 * @param {number} y 
 */
function drawOval(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.closePath();
    ctx.stroke();
}


function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!isDown) {
        return;
    }

    // get the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    let width = mouseX - startX;
    let height = mouseY - startY;

    if(shape == "rect"){
        // calculate the rectangle width/height based
        // on starting vs current mouse position

        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw a new rect from the start position 
        // to the current mouse position
        ctx.strokeRect(startX, startY, width, height);

    } else {
        drawOval(mouseX, mouseY);
    }


    prevStartX = startX;
    prevStartY = startY;

    prevWidth  = width;
    prevHeight = height;

        
}

// listen for mouse events
document.querySelector("#canvas").addEventListener('mousedown',function (e) {
    handleMouseDown(e);
});
document.querySelector("#canvas").addEventListener('mousemove',function (e) {
    handleMouseMove(e);
});
document.querySelector("#canvas").addEventListener('mouseup',function (e) {
    handleMouseUp(e);
});

document.querySelector("#canvas").addEventListener('mouseout',function (e) {
    handleMouseOut(e);
});

// Adding event listeners to switch shapes
const rectButton = document.querySelector("#rectButton");

rectButton.addEventListener('click', function(){
    shape = 'rect';
})

const circleButton = document.querySelector("#circleButton");

circleButton.addEventListener('click', function(){
    shape= 'circle';
})