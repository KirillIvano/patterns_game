import {UnitKey} from '../shared/UnitFactory';
import {IArmy} from './IArmy';


export type UnitMeta = {
    unitType: UnitKey;
    name: string;
    cost: number;
    maxHealth: number;
    baseAttack: number;
    baseDefence: number;
    healable: boolean;
    clonable: boolean;
    pluggable: boolean;
    specialProbability: number;
}

export type IUnitSnapshot = {
    unitType: UnitKey;
    health: number;
    attack: number;
    defence: number;
    id: number;
}

export interface IUnit {
    // unique random identifier
    id: number;

    meta: UnitMeta;

    // спец способность
    performSpecial(army: IArmy): void;
    // атака конкретного юнита
    performAttack(target: IUnit): void;
    // получить стейт юнита
    snapshot(): IUnitSnapshot;
    hit(amount: number): void;

    // текущий уровень здоровья юнита
    health: number;
    // сила атаки, сколько очков здоровья снимает атакой
    attackPower: number;
    // защита, сколько урона блокируется
    defence: number;
}
