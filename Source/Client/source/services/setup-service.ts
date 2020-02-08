import Soldier from "../objects/soldier"
import utils from "../utils/utils";
import { IEntity } from "../objects/base/entity";
import ImagesService from "./images-service";
import Sniper from '../../assets/Sniper.png';
import EventsService from "./events-service";

export default class SetupService {
    _images: ImagesService;
    _events: EventsService

    constructor(images: ImagesService, events: EventsService) {
        this._images = images;
        this._events = events;
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
        const imageKey = Sniper;
        const framesCount = 8;
        const frames = this._images.parseFrames(imageKey, framesCount);
        const frameRate = 6;

        const soldier = new Soldier(id, z, x, y, width, height, speed, imageKey, frames, frameRate);

        return [ soldier ];
    }
}