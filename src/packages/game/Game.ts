import {Army, IArmy} from './interfaces/IArmy';
import {IUnit, IUnitSnapshot} from './interfaces/IUnit';
import {UnitFactory} from './shared/UnitFactory';
import {HEALER_KEY} from './units/Healer';
import {KNIGHT_KEY} from './units/Knight';

export type UnitDto = {
    id: string;
}

export type GameFormation = 'single_row' | 'single_col' | 'three_rows';
export type GameParams = {
    formation: GameFormation;
    ally: IUnit[][],
    enemy: IUnit[][],
}
export type GameParamsUnwrapped = {
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
export type GameSnapshot = [IUnitSnapshot[], IUnitSnapshot[]][];

export interface IGame {
    run: (params: GameParams) => void
}


class StepContext {

}

export class Game implements IGame {
    run = (params: GameParams): GameSnapshot[] => {
        const gameField = new Army(
            params.ally,
            params.enemy,
            'single',
        );

        const history = [this.shot(gameField)];

        while (!gameField.check()) {
            this.step(gameField);
            gameField.cleanup();

            const shot = this.shot(gameField);
            history.push(shot);
        }

        return history;
    }

    // TODO: several rows
    shot(field: IArmy): GameSnapshot {
        const res = [];

        const rows = field.getAll();

        for (const row of rows) {
            res.push([
                row.ally.map(u => u.snapshot()),
                row.enemy.map(u => u.snapshot()),
            ]);
        }

        return res as GameSnapshot;
    }

    step(field: IArmy) {
        const selectedAttackerIterator = field.getRandomHead();
        const attackerUnit = selectedAttackerIterator.unit();
        const selectedAttackerSide = selectedAttackerIterator.getSide();

        const enemySide = selectedAttackerSide === 'ally' ? 'enemy' : 'ally';

        const enemyUnit = selectedAttackerIterator.currentRow()[enemySide].lookup() as IUnit;

        attackerUnit.performAttack(enemyUnit);
        if (enemyUnit.health > 0) enemyUnit.performAttack(attackerUnit);

        //TODO: add abilities
    }
}

const mockAlly = [HEALER_KEY, KNIGHT_KEY] as const;
const mockEnemy = [HEALER_KEY, KNIGHT_KEY] as const;


export const startGame = () => {
    const game = new Game();

    const factory = new UnitFactory();
    const ally = mockAlly.map(id => factory.get(id));
    const enemy = mockEnemy.map(id => factory.get(id));

    const gameResults = game.run({
        ally: [ally],
        enemy: [enemy],
        formation: 'single_row',
    });

    return gameResults;
};
