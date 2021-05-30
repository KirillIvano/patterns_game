import {IUnit} from './IUnit';

export interface IField {
    getRandomNeighbour(unit: IUnit): void;
    getNeighbourOfType(unit: IUnit, neighbourType: new () => IUnit): void;
}
