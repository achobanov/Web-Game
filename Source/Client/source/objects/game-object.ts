export default interface IGameObject { 
    id: string;
    update?: (dT: number) => void;
}