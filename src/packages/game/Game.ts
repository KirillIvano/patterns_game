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

export interface IGame {
    run: (params: GameParams) => void
}

export class Game implements IGame {
    run(params: GameParams) {

    }
}
