import {IUnit} from './IUnit';

export interface IArmy {
    getRowsCount(): number;
    getRowByInd(): IUnit[];
    getAllRows(): IUnit[][];
    getNeighbours(unit: IUnit): IUnit[];
}
