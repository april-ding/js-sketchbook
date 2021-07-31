// get the canvas element & its context
const canvas1 = document.querySelector('#canvas-1');
const ctx1 = canvas1.getContext('2d');

const ctx2 = document.querySelector('#canvas-2').getContext('2d');
const ctx3 = document.querySelector('#canvas-3').getContext('2d');
const ctx4 = document.querySelector('#canvas-4').getContext('2d');
const ctx5 = document.querySelector('#canvas-5').getContext('2d');

window.onload = function () {
    ctx1.beginPath();
    /* lines 
        moveTo(beginX, beginY);
        lineTo(endX, endY);
    */

    ctx1.moveTo(10, 10); // start at (10, 10)
    ctx1.lineTo(110, 10); // end at (110, 10)

    ctx1.moveTo(10, 20);
    ctx1.lineTo(150, 20);

    /* quad-curve
        starts at the last point in the shape, 
        passing thru the control points: cpx1, cpy1,
        end at (x, y):

        quadraticCurveTo(cpx1, cpy1, x, y);
    */
    ctx1.moveTo(10, 100);
    ctx1.quadraticCurveTo(110, 55, 210, 100);
    ctx1.fillRect(110, 55, 5, 5);

    /* bezier-curve
        starts at the last point in the shape, 
        passing thru the 2 control points: cpx1, cpy1, cpx2, cpy2,
        end at (x, y):

        bezierCurveTo(cpx1, cpy1, x, y);
    */
    ctx1.moveTo(10, 100);
    ctx1.bezierCurveTo(110, 55, 200, 300, 210, 100);
    ctx1.fillRect(200, 300, 5, 5);

    /* arc
        1. connect the current point to the beginning of the arc 
        2. center: (x, y)
        
        arc(x, y, radius, startAngle, endAngle, counterclockwise);
    */

    ctx1.arc(300, 300, 20, 0, 2 * Math.PI, false);
    ctx1.fillRect(300, 300, 3, 3);

    ctx1.moveTo(50, 300);
    ctx1.arc(50, 300, 35, Math.PI / 6, 11 * Math.PI / 6, false);
    ctx1.lineTo(50, 300);
    ctx1.fillRect(50, 300, 5, 5);
    ctx1.stroke();
    ctx1.closePath();

    /* ===================================================== */

    // 1. demonstrate line styles
    ctx2.lineWidth = 5;
    ctx2.lineCap = 'round';
    ctx2.beginPath();
    // a line
    ctx2.moveTo(10, 10);
    ctx2.lineTo(100, 10);

    ctx2.stroke();
    ctx2.closePath();

    // 2. demonstrate lineJoin
    ctx2.lineWidth = 10;
    ctx2.lineCap = 'butt';
    ctx2.lineJoin = 'round';
    ctx2.beginPath();
    // a line
    ctx2.moveTo(10, 40);
    ctx2.lineTo(100, 40);
    ctx2.lineTo(10, 80);

    ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();

    // 3. demonstrate rect
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    ctx2.rect(100, 100, 20, 20);
    ctx2.stroke();

    ctx2.fillRect(150, 150, 50, 50);
    ctx2.clearRect(150, 150, 30, 30);
    ctx2.closePath();

    /* ===================================================== */
    let linearGrad = ctx3.createLinearGradient(5, 5, 100, 5);
    linearGrad.addColorStop(0, 'blue');
    linearGrad.addColorStop(0.5, 'green');
    linearGrad.addColorStop(1, 'red');

    ctx3.strokeStyle = linearGrad;
    ctx3.lineWidth = 30;

    ctx3.beginPath();
    ctx3.moveTo(5, 5);
    ctx3.lineTo(100, 5);
    ctx3.stroke();
    ctx3.closePath();

    let radialGrad = ctx3.createRadialGradient(50, 50, 10, 50, 50, 40);
    radialGrad.addColorStop(0, 'blue');
    radialGrad.addColorStop(0.5, 'green');
    radialGrad.addColorStop(1, 'red');

    ctx3.beginPath();
    ctx3.fillStyle = radialGrad;
    ctx3.arc(60, 60, 30, 0, 2 * Math.PI, false);
    ctx3.fill();
    ctx3.closePath();

    /* ===================================================== */
    pixelHandler();

    imageTransform();
}

function pixelHandler() {
    /* beginPath/closePath aren't required for this code */
    const width = 400;
    const height = 400;
    let rectData = ctx4.createImageData(width, height);

    for (let r = 0; r < height; r++) { // cover all rows
        const cStart = Math.floor(Math.random() * r); // randomly start at a value in [1, rowNumber]
        for (let c = cStart; c < width - cStart; c++) {
            /* offset: calc the current pixel position
               4* because each pixel is 4 bytes, 
               row * width = how many pixels before this row,
               + c is the current pixel
            */
            const offset = 4 * (r * width + c);
            rectData.data[offset] = Math.floor(Math.random() * 256);// red
            rectData.data[offset + 1] = Math.floor(Math.random() * 256);// green
            rectData.data[offset + 2] = Math.floor(Math.random() * 256);// blue
            rectData.data[offset + 3] = 255;// alpha, fully opaque
        }
    }

    ctx4.putImageData(rectData, 0, 0);
}

function imageTransform() {
    var image = document.querySelector('#pic');

    ctx5.rotate(Math.PI / 6);
    ctx5.scale(1, 1);
    ctx5.translate(100, 100);
    ctx5.drawImage(image, 0, 0, 200, 200);
}

