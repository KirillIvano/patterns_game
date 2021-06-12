import {IUnit} from '../interfaces/IUnit';

export class CureBehavior {
    cure(target: IUnit, amount: number) {
        target.health = Math.min(
            target.meta.maxHealth,
            target.health + amount,
        );
    }
}
