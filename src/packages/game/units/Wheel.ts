import {IUnit, IUnitSnapshot} from '../interfaces/IUnit';

import {SnapshotBehavior} from '../behaviors/SnapshotBehavior';
import {getUniqueId} from '../utils/getUniqueId';


export const WHEEL_KEY = 'WHEEL' as const;
export const wheelMeta = {
    unitType: WHEEL_KEY,
    name: 'Колесо',
    cost: 10,
    maxHealth: 300,
    baseAttack: 0,
    baseDefence: 100,
    healable: false,
    clonable: false,
    pluggable: false,
    specialProbability: 0,
};

export class Wheel implements IUnit {
    private readonly snashotBehavior = new SnapshotBehavior();

    id = getUniqueId();
    meta = wheelMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    performSpecial() {}
    performAttack(unit: IUnit) {
        unit.hit(this.attackPower);
    }

    hit(): void {}
    snapshot(): IUnitSnapshot {
        return this.snashotBehavior.shot(this);
    }
}
