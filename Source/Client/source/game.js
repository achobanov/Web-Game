import Asset from './assets/sniper.png'

class Game {
    run = () => {
        var image = new Image();
        image.src = Asset;
        document.querySelector('body').appendChild(image);
    }
}

export { Game }