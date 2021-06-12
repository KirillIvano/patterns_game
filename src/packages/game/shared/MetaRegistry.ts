import {archerMeta, ARCHER_KEY} from '../units/Archer';
import {fellowMeta, FELLOW_KEY} from '../units/Fellow';
import {healerMeta, HEALER_KEY} from '../units/Healer';
import {knightMeta, KNIGHT_KEY} from '../units/Knight';
import {mageMeta, MAGE_KEY} from '../units/Mage';
import {wheelMeta, WHEEL_KEY} from '../units/Wheel';


export const META_REGISTRY = {
    [KNIGHT_KEY]: knightMeta,
    [ARCHER_KEY]: archerMeta,
    [WHEEL_KEY]: wheelMeta,
    [MAGE_KEY]: mageMeta,
    [HEALER_KEY]: healerMeta,
    [FELLOW_KEY]: fellowMeta,
};
