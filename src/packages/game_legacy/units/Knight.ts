import { Command } from '../Game';
import {UnitMeta, IUnit} from '../interfaces/IUnit';

const KNIGHT_KEY = 'KNIGHT_KEY' as const;
export const knightMeta: UnitMeta = {
    unitType: KNIGHT_KEY,
    name: 'Рыцарь',
    cost: 10,
    maxHealth: 100,
    baseAttack: 10,
    baseDefence: 30,
    healable: true,
    clonable: false,
    buffable: true,
};

export class Knight implements IUnit {
    special(): Command {
        throw new Error('Method not implemented.');
    }
    meta = knightMeta;

    health = this.meta.maxHealth;
    attack = this.meta.baseAttack;
    defence = this.meta.baseDefence;
}
