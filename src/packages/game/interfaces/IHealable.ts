import {IUnit} from '@/packages/game/interfaces/IUnit';

export interface IHealable extends IUnit {
    heal(unit: IUnit): void;
}
