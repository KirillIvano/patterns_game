import {Army, IArmy} from './interfaces/IArmy';
import {IUnit, IUnitSnapshot} from './interfaces/IUnit';
import {UnitFactory} from './shared/UnitFactory';
import {ARCHER_KEY} from './units/Archer';
import {FELLOW_KEY} from './units/Fellow';
import {HEALER_KEY} from './units/Healer';
import {KNIGHT_KEY} from './units/Knight';
import {MAGE_KEY} from './units/Mage';
import {WHEEL_KEY} from './units/Wheel';

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

const MAX_STEPS = 100;

export class Game implements IGame {
    run = (params: GameParams): GameSnapshot[] => {
        const gameField = new Army(
            params.ally,
            params.enemy,
            'single',
        );

        const history = [this.shot(gameField)];
        let step = 0;

        while (!gameField.check()) {
            step++;
            if (step > MAX_STEPS) break;

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

const mockAllyField = [
    [HEALER_KEY, KNIGHT_KEY],
    [ARCHER_KEY, KNIGHT_KEY],
    [WHEEL_KEY, KNIGHT_KEY],
    [FELLOW_KEY, KNIGHT_KEY],
];
const mockEnemyField = [
    [HEALER_KEY, KNIGHT_KEY],
    [ARCHER_KEY, KNIGHT_KEY],
    [WHEEL_KEY, KNIGHT_KEY],
    [FELLOW_KEY, KNIGHT_KEY],
];

export const startGame = () => {
    const game = new Game();

    const factory = new UnitFactory();
    const ally = mockAllyField.map(r => r.map(id => factory.get(id)));
    const enemy = mockEnemyField.map(r => r.map(id => factory.get(id)));

    const gameResults = game.run({
        ally,
        enemy,
        formation: 'single_row',
    });

    return gameResults;
};
