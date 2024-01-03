let room1 = {
    roomName: 'room1',
    roomDescription: 'ROOM1 DESCRIPTION TEXT',
    roomLock: false,
    roomInventory: ['key']
}

let roomLookUp = {
    room1,
}

const player = {
    name: '',
    location: 'room1',
    inventory: ['testPinv'],
}

let response;
let answer;
// let availableRoom = roomState[player.location]
let currentRoom = player.location
let nextRoom;

function checkInventory() {

    // console.clear()
    
    if (player.inventory.length > 0) {
        console.log("Inventory: " + player.inventory.join(", "))
        // askInput()
    } else {
        console.log("There is nothing in your inventory")
        // askInput()
    }

}

function takeItem(item) {
    
    // console.clear();

    const room = roomLookUp[currentRoom];

    if (room.roomInventory.includes(item)) {
        // Check if the item is present in the room's inventory
        player.inventory.push(item); // Add the item to the player's inventory
        room.roomInventory = room.roomInventory.filter(i => i !== item); // Remove the item from the room's inventory
        console.log(`You picked up ${item}`);
    } else {
        console.log("You can't pick that up");
    }

}

function dropItem(item) {
    
    const room = roomLookUp[currentRoom];

    if (player.inventory.includes(item)) {
        player.inventory = player.inventory.filter(i => i !== item)
        room.roomInventory.push(item)
        console.log(`You drop ${item} in ${currentRoom}`)
    } else {
        console.log("You can't drop that")
    }

}


console.log(room1.roomInventory)
checkInventory()
takeItem('key')
checkInventory()
console.log(room1.roomInventory)
dropItem('testPinv')
checkInventory()
console.log(room1.roomInventory)