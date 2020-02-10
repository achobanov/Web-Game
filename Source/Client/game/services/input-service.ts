import EventsService from "./events-service";
import MouseClickEvent from "../events/mouse-click-event";
import MouseMoveEvent from "../events/mouse-move-event";

export interface ICursorData {
    x: number,
    y: number,
}

export default class InputService {
    eventsService: EventsService

    constructor(container: HTMLElement, eventsService: EventsService) {
        this.eventsService = eventsService;

        const bounds = container.getBoundingClientRect();

        container.addEventListener('mousedown', event => {
            const mouseEvent = event as MouseEvent;
            const mouseClick = new MouseClickEvent(mouseEvent.which, {
                x: mouseEvent.clientX - bounds.left,
                y: mouseEvent.clientY - bounds.top,
            }); 
            
            this.eventsService.publish(mouseClick);
        })

        container.addEventListener('mousemove', event => {
            const mouseEvent = event as MouseEvent;
            const mouseMove = new MouseMoveEvent({
                x: mouseEvent.clientX - bounds.left,
                y: mouseEvent.clientY - bounds.top,
            });

            this.eventsService.publish(mouseMove);
        });
    } 
}