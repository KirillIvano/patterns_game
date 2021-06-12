import {Archer, ARCHER_KEY} from '../units/Archer';
import {Fellow, FELLOW_KEY} from '../units/Fellow';
import {Healer, HEALER_KEY} from '../units/Healer';
import {Knight, KNIGHT_KEY} from '../units/Knight';
import {Mage, MAGE_KEY} from '../units/Mage';
import {Wheel, WHEEL_KEY} from '../units/Wheel';

export type UnitKey = typeof KNIGHT_KEY
    | typeof ARCHER_KEY
    | typeof HEALER_KEY
    | typeof FELLOW_KEY
    | typeof MAGE_KEY
    | typeof WHEEL_KEY;

type KeyToClass = {
    [KNIGHT_KEY]: Knight,
    [ARCHER_KEY]: Archer,
    [WHEEL_KEY]: Wheel,
    [MAGE_KEY]: Mage,
    [HEALER_KEY]: Healer,
    [FELLOW_KEY]: Fellow,
};

const KEY_TO_CLASS = {
    [KNIGHT_KEY]: Knight,
    [ARCHER_KEY]: Archer,
    [WHEEL_KEY]: Wheel,
    [MAGE_KEY]: Mage,
    [HEALER_KEY]: Healer,
    [FELLOW_KEY]: Fellow,
};

const instancifyUnit = <T extends UnitKey>(key: T): KeyToClass[T] =>
    new KEY_TO_CLASS[key]() as KeyToClass[T];

export class UnitFactory {
    get<T extends UnitKey>(key: T): KeyToClass[T] {
        return instancifyUnit(key);
    }
}
