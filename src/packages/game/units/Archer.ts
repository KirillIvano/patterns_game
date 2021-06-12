import {IUnit, IUnitSnapshot} from '../interfaces/IUnit';

import {CureBehavior} from '../behaviors/CureBehavior';
import {HitBehavior} from '../behaviors/HitBehavior';
import {SnapshotBehavior} from '../behaviors/SnapshotBehavior';
import {ICurable} from '../interfaces/ICurable';
import {IClonable} from '../interfaces/IClonable';
import {IArmy} from '../interfaces/IArmy';
import {getUniqueId} from '../utils/getUniqueId';

export const ARCHER_KEY = 'ARCHER' as const;
export const archerMeta = {
    unitType: ARCHER_KEY,
    name: 'Лукист',
    cost: 10,
    maxHealth: 50,
    baseAttack: 10,
    baseDefence: 30,
    healable: true,
    clonable: true,
    pluggable: false,
    specialProbability: .2,
};

export class Archer implements IUnit, IClonable, ICurable {
    private readonly hitBehavior = new HitBehavior();
    private readonly cureBehavior = new CureBehavior();
    private readonly snashotBehavior = new SnapshotBehavior();

    id = getUniqueId();
    meta = archerMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    // hits first enemy in row
    performSpecial(army: IArmy) {
        const unitEntry = army.getIteratorForUnit(this);
        const side = unitEntry.getSide();

        const enemy =  unitEntry.currentRow()[side === 'ally' ? 'enemy' : 'ally'].lookup();

        if (enemy) {
            this.performAttack(enemy);
        }
    }
    performAttack(unit: IUnit) {
        unit.hit(this.attackPower);
    }

    hit(amount: number): void {
        this.hitBehavior.hit(this, amount);
    }

    clone(army: IArmy) {
        const entry = army.getIteratorForUnit(this);

        const copy = new Archer();

        copy.health = this.health;
        copy.defence = this.defence;
        copy.attackPower = this.attackPower;

        entry.insertAfter(copy);
    }

    cure(amount: number) {
        this.cureBehavior.cure(this, amount);
    }
    snapshot(): IUnitSnapshot {
        return this.snashotBehavior.shot(this);
    }

}
