import {IUnit} from '../interfaces/IUnit';
import {UnitMeta} from './UnitMeta';

export const mageMeta = new UnitMeta();

export class Mage implements IUnit {
    private meta = mageMeta;

    constructor() {

    }


}
