const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game state
const player = {
  name: '',
  location: 'entrance',
  inventory: [],
};

// Function to display the current location, inventory, and prompt for user input
function displayLocation() {
  console.log(`You are at the ${player.location} of the cave.`);

  // Display player inventory
  if (player.inventory.length > 0) {
    console.log('Inventory: ' + player.inventory.join(', '));
  }

  // Present different options based on the current location
  switch (player.location) {
    case 'entrance':
      console.log('You see two tunnels. Do you want to go left or right?');
      break;
    case 'left_tunnel':
      console.log('You find a key on the ground. Pick it up? (yes/no)');
      break;
    case 'right_tunnel':
      console.log('You encounter a locked door. Use the key to unlock it? (yes/no)');
      break;
    case 'treasure_room':
      console.log('Congratulations! You found the treasure room!');
      rl.close();
      break;
    default:
      console.log('You find yourself in a dark and unknown place.');
      break;
  }
}

// Function to handle user input
function handleInput(input) {
  switch (player.location) {
    case 'entrance':
      if (input.toLowerCase() === 'left') {
        player.location = 'left_tunnel';
      } else if (input.toLowerCase() === 'right') {
        player.location = 'right_tunnel';
      }
      break;
    case 'left_tunnel':
      if (input.toLowerCase() === 'yes') {
        console.log('You picked up the key.');
        player.inventory.push('key');
        player.location = 'entrance';
      } else {
        console.log('You left the key on the ground.');
        player.location = 'entrance';
      }
      break;
    case 'right_tunnel':
      if (input.toLowerCase() === 'yes') {
        if (player.inventory.includes('key')) {
          console.log('You unlocked the door and entered the treasure room!');
          player.location = 'treasure_room';
        } else {
          console.log('You need a key to unlock the door.');
        }
      } else {
        console.log('The door remains locked.');
        player.location = 'entrance';
      }
      break;
    default:
      console.log('Invalid input.');
      break;
  }

  displayLocation();
}

// Start the game
console.log('Welcome to the Text Adventure Game!');
rl.question('What is your name? ', (name) => {
  player.name = name;
  displayLocation();
  rl.on('line', (input) => {
    handleInput(input);
  });
});
