import {IUnit} from '../interfaces/IUnit';

export class HitBehavior {
    hit(target: IUnit, amount: number) {
        target.health -= Math.max(0, amount - target.defence);
    }
}
