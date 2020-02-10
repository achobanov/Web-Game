import Game from './source/game'
import launchSettings from './source/settings';

const container = document.getElementById('canvas');
if (!container) {
    throw new Error('Container element not found on page!');
}

container.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    return false;
});

var game = new Game(container, launchSettings);

game.menu(); 