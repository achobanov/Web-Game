export interface ISprite {
    x: number,
    y: number,
    width: number,
    height: number,
    frameIndex: number,
    frames: Array<Array<number>>
}

export default class RenderService {
    _context : CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        
        if (!context) throw new Error('Context not found!');

        this._context = context;
    }

    render = (sprite: ISprite) : void => {
        
    }
}