import {ICurable} from '../interfaces/ICurable';
import {IClonable} from '../interfaces/IClonable';
import {IPlugin} from '../interfaces/IPlugin';
import {Ctx, IUnit, IUnitSnapshot} from '../interfaces/IUnit';

import {CureBehavior} from '../behaviors/CureBehavior';
import {HitBehavior} from '../behaviors/HitBehavior';
import {SnapshotBehavior} from '../behaviors/SnapshotBehavior';

import {runWithProbability} from '../utils/runWithProbability';
import {IArmy} from '../interfaces/IArmy';
import {IPluggable} from '../interfaces/IPluggable';
import {ShieldPlugin} from '../plugins/ShieldPlugin';
import {getUniqueId} from '../utils/getUniqueId';


export const FELLOW_KEY = 'FELLOW' as const;
export const fellowMeta = {
    unitType: FELLOW_KEY,
    name: 'Пехотинец',
    cost: 10,
    maxHealth: 100,
    baseAttack: 20,
    baseDefence: 10,
    healable: true,
    clonable: false,
    pluggable: false,
    specialProbability: 0.1,
};

export class Fellow implements IUnit, ICurable, IClonable {
    private readonly hitBehavior = new HitBehavior();
    private readonly cureBehavior = new CureBehavior();
    private readonly snashotBehavior = new SnapshotBehavior();

    private plugin: IPlugin | null = null;

    id = getUniqueId();
    meta = fellowMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    // plugs neighbour
    performSpecial(ctx: Ctx, army: IArmy) {
        const armyEntry = army.getIteratorForUnit(this);

        const pluggableNeighbour = [
            armyEntry.prev(),
            armyEntry.next(),
        ].filter(x => x?.unit().meta.pluggable)[0];

        if (pluggableNeighbour) {
            const plugableUnit = pluggableNeighbour.unit() as IPluggable;

            ctx.addSpecialCommand(this.id, plugableUnit.id, 'plug');

            plugableUnit.plug(new ShieldPlugin());
        }
    }

    performAttack(unit: IUnit) {
        unit.hit(this.attackPower);
    }

    hit(amount: number): void {
        this.hitBehavior.hit(this, amount);

        if (this.plugin) {
            runWithProbability(
                () => (this.plugin as IPlugin).remove(this),
                this.plugin?.meta.fragility,
            );
        }
    }

    clone(army: IArmy) {
        const entry = army.getIteratorForUnit(this);

        const copy = new Fellow();

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
