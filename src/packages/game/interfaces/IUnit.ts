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

export interface IUnit {
    meta: UnitMeta;

    // текущий уровень здоровья юнита
    health: number;
    // сила атаки, сколько очков здоровья снимает атакой
    attack: number;
    // защита, сколько урона блокируется
    defence: number;
}
