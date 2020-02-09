import { IEvent } from "../services/events-service";
import Rocket from "../objects/rocket";

export default class RocketFireEvent implements IEvent {
    static Key = 'rocket-fire';
    
    key = RocketFireEvent.Key;
    rocket: Rocket;

    constructor(rocket: Rocket) {
        this.rocket = rocket;
    }
}