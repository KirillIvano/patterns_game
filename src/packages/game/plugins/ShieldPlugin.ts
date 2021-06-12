import {IPlugin, PluginMeta} from '../interfaces/IPlugin';
import {IUnit} from '../interfaces/IUnit';

export const shieldMeta: PluginMeta = {
    id: 'shield',
    fragility: .2,
};


export class ShieldPlugin implements IPlugin {
    meta = shieldMeta;

    set(unit: IUnit) {
        unit.defence += 10;
    }

    remove(unit: IUnit) {
        unit.defence -= 10;
    }
}
