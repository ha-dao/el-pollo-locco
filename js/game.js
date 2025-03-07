let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // console.log('My Character is', world.character);
}

// Tasten-Mapping: Tastendruck → Keyboard-Property
const keyMap = {
    'ArrowRight': 'RIGHT',
    'd': 'RIGHT',
    'ArrowLeft': 'LEFT',
    'a': 'LEFT',
    'ArrowUp': 'UP',
    'w': 'UP',
    'ArrowDown': 'DOWN',
    's': 'DOWN',
    ' ': 'SPACE',
    'f': 'F'
};

// Keydown-Event
document.addEventListener('keydown', (event) => {
    const key = keyMap[event.key];
    if (key) keyboard[key] = true;
});

// Keyup-Event
document.addEventListener('keyup', (event) => {
    const key = keyMap[event.key];
    if (key) keyboard[key] = false;
});

function getInstruction() {
    document.getElementById('instruction-template').classList.toggle('d-none');
}

function removeStartGameBtn() {
    document.getElementById('start-game-btn').style.display = 'none';
}