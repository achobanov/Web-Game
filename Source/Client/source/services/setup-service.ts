import Soldier from "../objects/entities/soldier"
import utils from "../utils/utils";
import { IEntity } from "../objects/sprites/entity";
import AssetsService from "./assets-service";
import EventsService from "./events-service";

export default class SetupService {
    _assets: AssetsService;
    _events: EventsService

    constructor(assets: AssetsService, events: EventsService) {
        this._assets = assets;
        this._events = events;
    }
    
    proofOfConcept = async () : Promise<IEntity[]> => {
        await this._assets.haveLoaded;

        const id = utils.uId();
        const z = 1;
        const x = 550;
        const y = 550;
        const width = 55;
        const height = 55;
        const speed  = 150;

        const soldier = new Soldier(this._events, this._assets, id, z, x, y, width, height, speed);

        return [ soldier ];
    }
}