import {Ctx, IUnit, IUnitSnapshot} from '../interfaces/IUnit';

import {HitBehavior} from '../behaviors/HitBehavior';
import {SnapshotBehavior} from '../behaviors/SnapshotBehavior';
import {IArmy} from '../interfaces/IArmy';
import {IClonable} from '../interfaces/IClonable';
import {getUniqueId} from '../utils/getUniqueId';


export const MAGE_KEY = 'MAGE' as const;
export const mageMeta = {
    unitType: MAGE_KEY,
    name: 'Маг',
    cost: 10,
    maxHealth: 20,
    baseAttack: 15,
    baseDefence: 5,
    healable: false,
    clonable: false,
    pluggable: false,
    specialProbability: .1,
};

export class Mage implements IUnit {
    private readonly hitBehavior = new HitBehavior();
    private readonly snashotBehavior = new SnapshotBehavior();

    id = getUniqueId();
    meta = mageMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    // clones neighbour
    performSpecial(ctx: Ctx, army: IArmy) {
        const armyEntry = army.getIteratorForUnit(this);

        const clonableNeighbour = [
            armyEntry.prev(),
            armyEntry.next(),
        ].filter(x => x?.unit().meta.clonable)[0];

        if (clonableNeighbour) {
            const clonableUnit = clonableNeighbour.unit() as IClonable;

            ctx.addSpecialCommand(this.id, clonableUnit.id, 'clone');

            clonableUnit.clone(army);
        }
    }

    performAttack(unit: IUnit) {
        unit.hit(this.attackPower);
    }

    hit(amount: number): void {
        this.hitBehavior.hit(this, amount);
    }

    snapshot(): IUnitSnapshot {
        return this.snashotBehavior.shot(this);
    }
}
