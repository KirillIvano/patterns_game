import { GameFormation } from "../../common/types";

export type UnitDto = {
    id: number;
}
export type ArmyDto = UnitDto[];
export type GameConfig = {
    formation: GameFormation,
    fellowArmy: ArmyDto,
    enemyArmy: ArmyDto,
}

export class Game {
    constructor(private gameConfig: GameConfig) {}
}