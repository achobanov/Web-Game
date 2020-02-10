import { ISprite, IShape } from "../../services/canvas-service";
import AssetsService from "../../services/assets-service";
import Sprite from "./sprite";

export interface IEntity extends ISprite {
    z: number,
    update: (dt : number) => void;
}

export default class Entity extends Sprite implements IEntity {
    _speed: number;
    _desination: { x: number, y: number };
    _isMoving: boolean;
    
    z: number;
    effects: IShape[];
    
    constructor(
        assets: AssetsService,
        assetKey: string,
        uid: string,
        z: number,
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
    ) {
        super(assets, assetKey, uid, x, y, width, height, 0);

        this._speed = speed;
        this._desination = { x ,y };
        this._isMoving = false;

        this.uid = uid;
        this.z = z;
        this.angle = 0;
        this.effects = [];
    }
        
    update(dT: number) : void {
        if (this._shouldMove())
            this._move(dT);

        super.update(dT);
    }

    _shouldMove() { return this._isMoving; }
    
    _move(dT: number) {
        const distance = this._speed * dT;

        const xRemaining = Math.abs(this.x - this._desination.x);
        const yRemaining = Math.abs(this.y - this._desination.y);
        let xDistance, yDistance = 0;
        if (xRemaining == yRemaining) {
            xDistance = distance;
            yDistance = distance;
        } else if (xRemaining > yRemaining)
        {
            xDistance = distance;
            yDistance = yRemaining / xRemaining * distance;
        } else {
            xDistance = xRemaining / yRemaining * distance;
            yDistance = distance;
        }

        this.x = this._updateLinear(this.x, xDistance, this._desination.x);
        this.y = this._updateLinear(this.y, yDistance, this._desination.y);
        
        if (this._desination.x === this.x && this._desination.y === this.y) {
            this._stopMoving();
        }
    }

    _updateLinear(current: number, distance: number, destination?: number) : number {
        if (!destination) return current + distance;

        return destination > current
            ? Math.min(current + distance, destination)
            : Math.max(current - distance, destination);
    }

    _startMoving({ x, y }: { x: number, y: number}) {
        this._desination = { x, y };
        this._isMoving = true;
    }

    _stopMoving() {
        this._isMoving = false;
    }
}