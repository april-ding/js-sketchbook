/* Exercise from https://wesbos.com beginner js course*/

// select the elements on the page - canvas, shake button
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // where we do the drawing
const clearBtn = document.querySelector('.button-clear');

// CONSTANTS
const SPEED = 50;

// set up our canvas for drawing
const { width, height } = canvas;

// create random starting points
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);


// styling
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 50;

ctx.beginPath(); 
ctx.moveTo(x, y);
ctx.stroke();

// write a draw function
function draw({ key }) {
    // change color
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(x, y);
    // calc the next point destination
    if (key === 'ArrowUp') {
        y -= SPEED;
    } else if (key === 'ArrowDown') {
        y += SPEED;
    } else if (key === 'ArrowLeft') {
        x -= SPEED;
    } else if (key === 'ArrowRight') {
        x += SPEED;
    }
    // if x or y are out of range
    if (x < 0) {
        x = 0;
    } else if (x > width) {
        x = width;
    } 
    if (y < 0) {
        y = 0;
    } else if (y > height) {
        y = height;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

// clear function
function clearCanvas() {
    canvas.classList.add('shake');
    // clear canvas content
    ctx.clearRect(0, 0, width, height);
    // remove class 'shake' after the animation is done playing
    canvas.addEventListener('animationend', () => {
        canvas.classList.remove('shake');
    }, { once: true }); // will automatically remove the listener when it's done
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
clearBtn.addEventListener('click', clearCanvas);