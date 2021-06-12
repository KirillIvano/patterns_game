import {Army, IArmy} from './interfaces/IArmy';
import {IUnit, IUnitSnapshot} from './interfaces/IUnit';
import {UnitFactory} from './shared/UnitFactory';
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

export class Game implements IGame {
    run = (params: GameParams) => {
        const gameField = new Army(
            params.ally,
            params.enemy,
            'single',
        );

        while (!gameField.check()) {
            console.log(JSON.stringify(this.shot(gameField)));
            this.step(gameField);
            console.log(JSON.stringify(this.shot(gameField)));

            gameField.cleanup();
        }
    }

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
    }
}

const mockAlly = [KNIGHT_KEY, KNIGHT_KEY] as const;
const mockEnemy = [KNIGHT_KEY, KNIGHT_KEY] as const;


const startGame = () => {
    const game = new Game();

    const factory = new UnitFactory();
    const ally = mockAlly.map(id => factory.get(id));
    const enemy = mockEnemy.map(id => factory.get(id));

    game.run({
        ally: [ally],
        enemy: [enemy],
        formation: 'single_row',
    });
};


startGame();
