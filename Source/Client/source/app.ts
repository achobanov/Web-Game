import Game from './game'
import launchSettings from './settings';

const container = document.getElementById('canvas');
if (!container) {
    throw new Error('Container element not found on page!');
}

var game = new Game(container, launchSettings);

game.start(); 