import knight from 'url:src/image/units/knight.svg';
import archer from 'url:src/image/units/archer.svg';
import healer from 'url:src/image/units/healer.jpeg';
import mage from 'url:src/image/units/mage.svg';
import wheel from 'url:src/image/units/wheel.jpeg';
import fellow from 'url:src/image/units/fellow.svg';

import {KNIGHT_KEY} from 'src/packages/game/units/Knight';
import {UnitKey} from 'src/packages/game/shared/UnitFactory';
import {ARCHER_KEY} from 'src/packages/game/units/Archer';
import {WHEEL_KEY} from 'src/packages/game/units/Wheel';
import {FELLOW_KEY} from 'src/packages/game/units/Fellow';
import {HEALER_KEY} from 'src/packages/game/units/Healer';
import {MAGE_KEY} from 'src/packages/game/units/Mage';


export const UNIT_IMAGE_REGISTRY: Record<UnitKey, string> = {
    [KNIGHT_KEY]: knight,
    [ARCHER_KEY]: archer,
    [WHEEL_KEY]: wheel,
    [FELLOW_KEY]: fellow,
    [HEALER_KEY]: healer,
    [MAGE_KEY]: mage,
};
