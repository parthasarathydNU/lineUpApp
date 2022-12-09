// get references to the canvas and context
let canvas = document.getElementById("canvas");
let overlay = document.getElementById("overlay");
let ctx = canvas.getContext("2d");
let ctxo = overlay.getContext("2d");

// style the context
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctxo.strokeStyle = "blue";
ctxo.lineWidth = 3;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
// let canvas = $("#canvas");
let canvasOffset = canvas.getBoundingClientRect();
let offsetX = canvasOffset.left;
let offsetY = canvasOffset.top;
let scrollY = canvas.scrollTop;

// this flage is true when the user is dragging the mouse
let isDown = false;

// these lets will hold the starting mouse position
let startX;
let startY;

let prevStartX = 0;
let prevStartY = 0;

let prevWidth  = 0;
let prevHeight = 0;

let shape = 'circle';


function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // set a flag indicating the drag has begun
    isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    

    // the drag is over, clear the dragging flag
    isDown = false;
    
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

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

function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
}

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

    // Put your mousemove stuff here

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

    // 
    


    
    
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


const rectButton = document.querySelector("#rectButton");

rectButton.addEventListener('click', function(){
    shape = 'rect';
})

const circleButton = document.querySelector("#circleButton");

circleButton.addEventListener('click', function(){
    shape= 'circle';
})