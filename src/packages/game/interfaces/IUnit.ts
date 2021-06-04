import {IField} from './IField';

export type UnitMeta = {
    unitType: string;
    name: string;
    cost: number;
    maxHealth: number;
    baseAttack: number;
    baseDefence: number;
    healable: boolean;
    clonable: boolean;
    buffable: boolean;
    specialProbability: number;
}

export type UnitSnapshot = {
    unitType: string;
    health: number;
    attack: number;
    defence: number;
}

export interface IUnit {
    meta: UnitMeta;

    // спец способность
    performSpecial(army: IField): void;
    // атака конкретного юнита
    performAttack(unit: IUnit, army: IField): void;
    // получить стейт юнита
    snapshot(): UnitSnapshot;

    // текущий уровень здоровья юнита
    health: number;
    // сила атаки, сколько очков здоровья снимает атакой
    attackPower: number;
    // защита, сколько урона блокируется
    defence: number;
}
