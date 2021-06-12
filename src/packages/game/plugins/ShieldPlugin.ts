import {IPlugin, PluginMeta} from '../interfaces/IPlugin';
import {IUnit} from '../interfaces/IUnit';


export const shieldMeta: PluginMeta = {
    id: 'shield',
    fragility: .5,
};

export class ShieldPlugin implements IPlugin {
    meta = shieldMeta;

    set(unit: IUnit) {
        unit.defence += 2;
    }

    remove(unit: IUnit) {
        unit.defence -= 2;
    }
}
