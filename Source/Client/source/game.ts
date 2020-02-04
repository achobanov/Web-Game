import ResourcesService from "./services/resources-service";

export default class Game {
    resources: ResourcesService
    
    constructor() {
        this.resources = new ResourcesService()
    }
}
