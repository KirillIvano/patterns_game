import {IUnit, UnitSnapshot} from '../interfaces/IUnit';

const KNIGHT_KEY = 'KNIGHT' as const;
export const knightMeta = {
    unitType: KNIGHT_KEY,
    name: 'Рыцарь',
    cost: 10,
    maxHealth: 100,
    baseAttack: 10,
    baseDefence: 30,
    healable: true,
    clonable: false,
    buffable: true,
    specialProbability: .1,
};

export class Knight implements IUnit {
    meta = knightMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    performSpecial() {}
    performAttack(unit: IUnit) {
        unit.health -= 10;
    }
    snapshot = (): UnitSnapshot => ({
        unitType: this.meta.unitType,
        health: this.health,
        attack: this.attackPower,
        defence: this.defence,
    })
}
