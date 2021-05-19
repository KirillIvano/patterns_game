import {IUnit} from '@/packages/game/interfaces/IUnit';

export interface IArmorable extends IUnit {
    setArmor(unit: IUnit): void;
}
