import {IUnit, IUnitSnapshot} from '../interfaces/IUnit';

export class SnapshotBehavior {
    shot(target: IUnit): IUnitSnapshot {
        return {
            unitType: target.meta.unitType,
            health: target.health,
            attack: target.attackPower,
            defence: target.defence,
        };
    }
}
