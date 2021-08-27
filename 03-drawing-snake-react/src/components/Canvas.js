import { useState, useRef, useEffect } from 'react';

const Canvas = (props) => {
    // constants
    const SPEED = 50; 
    const { width, height } = props;
    // refs: reference to actual DOM elements
    const canvasRef = useRef(null);

    // states
    const [hue, setHue] = useState(0);
    const [x, setX] = useState(Math.floor(Math.random() * width));
    const [y, setY] = useState(Math.floor(Math.random() * height));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        draw(ctx);
    }, [draw]);

    const draw = (ctx, {key}) => {
        // change color
        setHue(10);
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

        ctx.beginPath();
        ctx.moveTo(x, y);
        // calc the next point destination
        if (key === 'ArrowUp') {
            setY(y - SPEED);
        } else if (key === 'ArrowDown') {
            setY(y + SPEED);
        } else if (key === 'ArrowLeft') {
            setX(x - SPEED);
        } else if (key === 'ArrowRight') {
            setX(x + SPEED);
        }
        // if x or y are out of range
        if (x < 0) {
            setX(0);
        } else if (x > width) {
            setX(width);
        } 
        if (y < 0) {
            setY(0);
        } else if (y > height) {
            setY(height);
        }
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    const handleKey = (e) => {
        if (e.key.includes('Arrow')) {
            e.preventDefault();
            draw({ key: e.key });
        }
    }

    return (
        <canvas onKeyDown={handleKey} ref={canvasRef} {...props}></canvas>
    )
}

export default Canvas;