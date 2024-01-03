// Readline
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Rooms

let start = {
    roomName: 'start',
    roomDescription: 'START DESCRIPTION TEXT',
    roomLock: false,
    roomInventory: []
}

let roomLookUp = {
    start,
}

// Player State
const player = {
    name: '',
    location: 'start',
    inventory: [],
}

// Room State
const roomState = {
    start: ['room1'],
    room1: ['start', 'room2'],
    room2: ['room1', 'exit'],
    exit: []
}

// Variables
let response;
let answer;
let availableRoom = roomState[player.location]
let currentRoom = player.location
let nextRoom;

function displayRoomDescription(roomName) {
    const room = roomLookUp[roomName]

    if (room) {
        console.log(room.roomDescription)
    } else {
        console.log('Error')
    }
}

displayRoomDescription(currentRoom)