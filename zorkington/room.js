const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// Change Room Function



// function changeRoom(newRoom) {
    
//     if (availableRooms.includes(newRoom)) {
//         playerLocation = newRoom
//         console.log(`Now in ${playerLocation}`)
//     } else {
//         console.log('Does not work')
//     }
// }


// ! WORKS
// console.log(room1.roomDescription)
// console.log(room1.roomLock)
// room1.unlockRoom()
// console.log(room1.roomLock)
// console.log(`You are standing in ${room1.roomName} and its lock status is currently ${room1.roomLock}`)
// console.log(`${playerLocation.roomName}`)

// TODO: TESTING
// console.log(availableRoom)
// console.log(currentRoom)
// console.log(currentLocation)
// console.log(playerLocation)
// changeRoom('room1')
// console.log(room3.roomLock)

async function start() {

    class Room {
        constructor( roomName, roomDescription, roomLock) {
            this.roomName = roomName,
            this.roomDescription = roomDescription,
            this.roomLock = roomLock
        }
    
        unlockRoom() {
            this.roomLock = false
        }
    
    }
    
    let room1 = new Room('room1', 'This is room1 description', true)
    let room2 = new Room('room2', 'This is room2 description', true)
    let room3 = new Room('room3', 'This is room3 description', true)

    let playerLocation = 'room2'

    const currentLocation = {
        room1,
        room2,
        room3
    }

    // State Machine for Changing Rooms

    const stateRoomChange = {
        room1: ['room2'],
        room2: ['room1', 'room3'],
        room3: ['room2']
    }

    let availableRooms = stateRoomChange[playerLocation];
    let currentRoom = currentLocation[playerLocation].roomName
    let response;
    let answer;

    function changeRoom(newRoom) {
    
        if (availableRooms.includes(newRoom) && newRoom.roomLock === false) {
            playerLocation = newRoom
            console.log(`Now in ${playerLocation}`)
        } else {
            console.clear()
            console.log('Not Possible')
        }

    }

    // function unlock(newRoom) {
    //     newRoom.unlockRoom()
    // }

    console.log(`Currently in ${playerLocation}`)

    response = await ask('Input your next action: \n>_ ')

    answer = response.toLowerCase().split(' ')

    if (answer[0] === 'move') {
        changeRoom(answer[1])
        start()
    } else if (answer[0] === 'unlock' && availableRooms.includes(answer[1])) {
        Room(answer[1]).unlockRoom()
        start()
    }

}

start()