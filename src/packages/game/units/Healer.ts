import {ICurable} from '../interfaces/ICurable';
import {Ctx, IUnit, IUnitSnapshot} from '../interfaces/IUnit';

import {CureBehavior} from '../behaviors/CureBehavior';
import {HitBehavior} from '../behaviors/HitBehavior';
import {SnapshotBehavior} from '../behaviors/SnapshotBehavior';
import {getUniqueId} from '../utils/getUniqueId';

import {IArmy} from '../interfaces/IArmy';


export const HEALER_KEY = 'HEALER' as const;
export const healerMeta = {
    unitType: HEALER_KEY,
    name: 'Хилер',
    cost: 10,
    maxHealth: 20,
    baseAttack: 30,
    baseDefence: 5,
    healable: true,
    clonable: false,
    pluggable: false,
    specialProbability: .2,
};

export class Healer implements IUnit, ICurable {
    private readonly hitBehavior = new HitBehavior();
    private readonly cureBehavior = new CureBehavior();
    private readonly snashotBehavior = new SnapshotBehavior();

    id = getUniqueId();
    meta = healerMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    // heals neighbour
    performSpecial(ctx: Ctx, army: IArmy) {
        const armyEntry = army.getIteratorForUnit(this);

        const curableNeighbour = [
            armyEntry.prev(),
            armyEntry.next(),
        ].filter(x => x?.unit().meta.healable)[0];

        if (curableNeighbour) {
            const curableUnit = curableNeighbour.unit() as ICurable;

            ctx.addSpecialCommand(this.id, curableUnit.id, 'cure');

            curableUnit.cure(10);
        }
    }
    performAttack(unit: IUnit) {
        unit.hit(this.attackPower);
    }

    hit(amount: number): void {
        this.hitBehavior.hit(this, amount);
    }
    cure(amount: number) {
        this.cureBehavior.cure(this, amount);
    }
    snapshot(): IUnitSnapshot {
        return this.snashotBehavior.shot(this);
    }
}
