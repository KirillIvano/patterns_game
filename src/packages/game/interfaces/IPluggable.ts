import {IPlugin} from './IPlugin';
import {IUnit} from './IUnit';

export interface IPluggable extends IUnit {
    plug(plugin: IPlugin, source: IUnit): void;
}
