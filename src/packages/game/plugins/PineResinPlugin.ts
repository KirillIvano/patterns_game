import {IPlugin, PluginMeta} from '../interfaces/IPlugin';
import {IUnit} from '../interfaces/IUnit';


export const goldenResinMeta: PluginMeta = {
    id: 'goldPineResin',
    fragility: .5,
};

export class PineResinPlugin implements IPlugin {
    meta = goldenResinMeta;

    set(unit: IUnit) {
        unit.attackPower += 10;
    }

    remove(unit: IUnit) {
        unit.attackPower -= 10;
    }
}
