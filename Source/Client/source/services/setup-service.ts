import Soldier from "../objects/soldier"
import utils from "../utils/utils";
import { IEntity } from "../objects/base/entity";
import ImagesService from "./images-service";

export default class SetupService {
    _images: ImagesService;

    constructor(images: ImagesService) {
        this._images = images;
    }
    
    proofOfConcept = async () : Promise<IEntity[]> => {
        await this._images.haveLoaded;
        
        const id = utils.uId();
        const z = 1;
        const x = 550;
        const y = 550;
        const width = 50;
        const height = 50;
        const speed  = 10;
        const imageKey = 'sniper.png';
        const framesCount = 8;
        const frames = this._images.parseFrames(imageKey, framesCount);
        const frameRate = 3;

        const soldier = new Soldier(id, z, x, y, width, height, speed, imageKey, frames, frameRate);

        return [ soldier ];
    }
}