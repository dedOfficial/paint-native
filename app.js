const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const range = document.getElementById('range');
const colors = document.getElementById('colors');
const modeBtn = document.getElementById('mode');
const saveBtn = document.getElementById('save');

const CANVAS_SIZE = 700;

let painting = false;
let filling = false;
let changes = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = '#2c2c2c';
ctx.fillStyle = '#2c2c2c';
ctx.lineWidth = parseFloat(range.defaultValue);

function handleMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting || filling) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorPick(event) {
    const t = event.target;
    if (t && t.matches('.controls__color')) {
        ctx.strokeStyle = t.style.backgroundColor;
        ctx.fillStyle = t.style.backgroundColor;
    }
}

function handleLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function handleMouseDown() {
    painting = true;
    changes = true;
    if(filling) {
        handleCanvasFillingClick();
    }
}
function stopPainting() {
    painting = false;
}

function handleModeChange(event) {
    if (!filling) {
        filling = true;
        event.target.textContent = 'Рисование';
    } else {
        filling = false;
        event.target.textContent = 'Заливка';
    }
}

function handleCanvasFillingClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveImage() {
    if (changes) {
        const imageDataURL = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'paint_my_image';
        link.click();
    } else {
        alert('Не получается сохранить пустой рисунок. Пожалуйста, нарисуйте что нибудь!');
    }
}


if (canvas) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('contextmenu', handleCM);
}

if (colors) {
    colors.addEventListener('click', handleColorPick);
}

if (range) {
    range.addEventListener('input', handleLineWidthChange);
}

if (modeBtn) {
    modeBtn.addEventListener('click', handleModeChange);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveImage);
}