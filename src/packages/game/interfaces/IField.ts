import {IArmy} from './IArmy';

export interface IField {
    readonly ally: IArmy,
    readonly enemy: IArmy,
}
