import {IField} from './interfaces/IField';
import {UnitSnapshot} from './interfaces/IUnit';

export type UnitDto = {
    id: string;
}

export type GameFormation = 'single_row' | 'single_col' | 'three_rows';
export type GameParams = {
    formation: GameFormation;
    ally: UnitDto[],
    enemy: UnitDto[],
}
export type GameParamsDto = {
    formation: GameFormation;
    ally?: UnitDto[],
    enemy?: UnitDto[],
}
export type GameCommand = {
    type: string;
    payload: Record<string, any>
}
export type GameResult = {
    history: GameCommand[][];
}
export type GameSnapshot = {
    ally: UnitSnapshot[][];
    enemy: UnitSnapshot[][];
}

export interface IGame {
    run: (params: GameParams) => void
}

// export type GameShot = {
//     ally: ,
//     enemy: ,
// }

export class Game implements IGame {
    private _gameField: IField = {} as IField;

    shot(): GameSnapshot {
        return {
            ally: this._gameField.ally.getAllRows().map(r => r.map(i => i.snapshot())),
            enemy: this._gameField.enemy.getAllRows().map(r => r.map(i => i.snapshot())),
        };
    }

    step() {
        for (let i = 0; i < this._gameField.ally.getRowsCount(); i++) {
            const currentAlly = this._gameField.ally.getRowByInd(i)[0];
            const currentEnemy = this._gameField.enemy.getRowByInd(i)[0];
        }
    }

    constructor({ally, enemy, formation}: GameParams) {

    }
    run: (params: GameParams) => void;
}

const game = new Game();
game.run({
    formation: 'single_row',
    ally: [],
    enemy: [],
});
