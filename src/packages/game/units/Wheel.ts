import {IUnit, IUnitSnapshot} from '../interfaces/IUnit';

import {SnapshotBehavior} from '../behaviors/SnapshotBehavior';
import {getUniqueId} from '../utils/getUniqueId';
import {HitBehavior} from '../behaviors/HitBehavior';


export const WHEEL_KEY = 'WHEEL' as const;
export const wheelMeta = {
    unitType: WHEEL_KEY,
    name: 'Колесо',
    cost: 10,
    maxHealth: 300,
    baseAttack: 0,
    baseDefence: 0,
    healable: false,
    clonable: false,
    pluggable: false,
    specialProbability: 0,
};

export class Wheel implements IUnit {
    private readonly snashotBehavior = new SnapshotBehavior();
    private readonly hitBehavior = new HitBehavior();

    id = getUniqueId();
    meta = wheelMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    performSpecial() {}
    performAttack() {}

    hit(amount: number): void {
        this.hitBehavior.hit(this, amount);
    }
    snapshot(): IUnitSnapshot {
        return this.snashotBehavior.shot(this);
    }
}
