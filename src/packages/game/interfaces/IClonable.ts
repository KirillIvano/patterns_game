import {IUnit} from '@/packages/game/interfaces/IUnit';

export interface IClonable extends IUnit {
    copy(unit: IUnit): void;
}
