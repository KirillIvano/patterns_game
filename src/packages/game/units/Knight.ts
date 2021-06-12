import {ICurable} from '../interfaces/ICurable';
import {IPluggable} from '../interfaces/IPluggable';
import {IPlugin} from '../interfaces/IPlugin';
import {IUnit, IUnitSnapshot} from '../interfaces/IUnit';

import {CureBehavior} from '../behaviors/CureBehavior';
import {HitBehavior} from '../behaviors/HitBehavior';
import {SnapshotBehavior} from '../behaviors/SnapshotBehavior';

import {runWithProbability} from '../utils/runWithProbability';


export const KNIGHT_KEY = 'KNIGHT' as const;
export const knightMeta = {
    unitType: KNIGHT_KEY,
    name: 'Рыцарь',
    cost: 10,
    maxHealth: 100,
    baseAttack: 10,
    baseDefence: 30,
    healable: true,
    clonable: false,
    pluggable: true,
    specialProbability: 0,
};

export class Knight implements IUnit, ICurable, IPluggable {
    private readonly hitBehavior = new HitBehavior();
    private readonly cureBehavior = new CureBehavior();
    private readonly snashotBehavior = new SnapshotBehavior();

    private plugin: IPlugin | null = null;

    meta = knightMeta;

    health = this.meta.maxHealth;
    attackPower = this.meta.baseAttack;
    defence = this.meta.baseDefence;

    performSpecial() {}
    performAttack(unit: IUnit) {
        unit.hit(this.attackPower);
    }

    hit(amount: number): void {
        this.hitBehavior.hit(this, amount);

        if (this.plugin) {
            runWithProbability(
                () => (this.plugin as IPlugin).remove(this),
                this.plugin?.meta.durability,
            );
        }
    }
    plug(plugin: IPlugin): void {
        this.plugin = plugin;
    }
    cure(amount: number) {
        this.cureBehavior.cure(this, amount);
    }
    snapshot(): IUnitSnapshot {
        return this.snashotBehavior.shot(this);
    }
}
