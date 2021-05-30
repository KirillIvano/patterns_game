import {type} from 'os';
import {GameFormation} from '../../common/types';
import {ACTIONS} from './actions';
import {IUnit} from './interfaces/IUnit';

export type UnitDto = {
    id: number;
}
export type ArmyDto = UnitDto[];
export type GameConfig = {
    formation: GameFormation,
    fellowArmy: ArmyDto,
    enemyArmy: ArmyDto,
}

export interface ICommand<TType extends string, TPayload extends unknown> {
    type: TType;
    payload: TPayload;
}

export type UnitPosition = {
    row: number;
    col: number;
};

export type AttackCommand = {
    type: typeof ACTIONS.ATTACK,
    payload: {
        source: UnitPosition,
        target: UnitPosition,
        damage: number,
    },
};
export type HealCommand = {
    type: typeof ACTIONS.HEAL,
    payload: {
        source: UnitPosition,
        target: UnitPosition,
        value: number;
    }
}
export type CloneCommand = {
    type: typeof ACTIONS.CLONE,
    payload: {
        source: UnitPosition,
        target: UnitPosition,
    }
}
export type EnhanceCommand = {
    type: typeof ACTIONS.ENHANCE,
    payload: {
        source: UnitPosition,
        target: UnitPosition,
    },
}
export type Command = AttackCommand | HealCommand | CloneCommand | EnhanceCommand;

export class Game {
    constructor(
        private ally: IUnit[],
        private enemy: IUnit[],
    ) {}

    private steps: [][];

    getStepCommands() {

    }

    play() {

    }
}

const ally = [];
const enemy = [];
