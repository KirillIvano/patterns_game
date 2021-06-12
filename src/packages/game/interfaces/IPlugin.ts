import {IUnit} from './IUnit';

export type PluginType = 'shield' | 'goldPineResin';

export type PluginMeta = {
    id: PluginType;
    // 0 - 1, probability to break from attack
    fragility: number;
}

export interface IPlugin {
    meta: PluginMeta;

    set(target: IUnit): void;
    remove(target: IUnit): void;
}

