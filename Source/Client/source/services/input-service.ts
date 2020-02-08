import EventsService from "./events-service";
import MouseClickEvent from "../events/mouse-click-event";
import MouseMoveEvent from "../events/mouse-move-event";

export interface ICursorData {
    x: number,
    y: number,
}

export default class InputService {
    eventsService: EventsService

    constructor(container: Node, eventsService: EventsService) {
        this.eventsService = eventsService;

        container.addEventListener('mousedown', event => {
            const mouseEvent = event as MouseEvent;
            const mouseClick = new MouseClickEvent(mouseEvent.which)
            
            this.eventsService.publish(mouseClick);
        })

        container.addEventListener('mousemove', event => {
            const mouseEvent = event as MouseEvent;
            const mouseMove = new MouseMoveEvent({
                x: mouseEvent.clientX,
                y: mouseEvent.clientY,
            });

            this.eventsService.publish(mouseMove);
        });
    } 
}