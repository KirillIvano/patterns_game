import {IFieldRow} from './IArmy';
import {IUnit} from './IUnit';

export interface IRowEntry {
    next(): IRowEntry | null;
    prev(): IRowEntry | null;
    insertAfter(IUnit: IUnit): void;
    currentRow(): IFieldRow;
    getSide(): 'ally' | 'enemy';
    unit(): IUnit;
}
