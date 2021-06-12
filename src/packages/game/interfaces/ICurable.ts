import {IUnit} from './IUnit';

export interface ICurable extends IUnit {
    cure(amount: number, source: IUnit): void;
}
