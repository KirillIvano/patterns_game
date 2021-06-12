import {IUnit} from 'src/packages/game/interfaces/IUnit';
import {IArmy} from './IArmy';

export interface IClonable extends IUnit {
    clone(army: IArmy): void;
}
