import {Army, IArmy} from './interfaces/IArmy';
import {Ctx, IUnit, IUnitSnapshot, SpecialHistoryEntry} from './interfaces/IUnit';
import {UnitFactory, UnitKey} from './shared/UnitFactory';
import {runWithProbability} from './utils/runWithProbability';

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
export type GameSnapshot = [IUnitSnapshot[], IUnitSnapshot[]][];

export interface IGame {
    run: (params: GameParams) => void
}

const MAX_STEPS = 100;

export class Game implements IGame {
    run = (params: GameParams): {history: GameSnapshot[], perksHistory: SpecialHistoryEntry[][]} => {
        const gameField = new Army(
            params.ally,
            params.enemy,
            'single',
        );

        const history = [this.shot(gameField)];
        const perksHistory: SpecialHistoryEntry[][] = [];

        let step = 0;

        while (!gameField.check()) {
            step++;
            if (step > MAX_STEPS) break;

            const stepPerks: SpecialHistoryEntry[] = [];
            const stepContext: Ctx = {
                addSpecialCommand(i, j, t) {
                    stepPerks.push({source: i, target: j, type: t});
                },
            };

            this.step(gameField, stepContext);
            gameField.cleanup();

            const shot = this.shot(gameField);

            history.push(shot);
            perksHistory.push(stepPerks);
        }

        return {history, perksHistory};
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

    step(field: IArmy, stepContext: Ctx) {
        const selectedAttackerIterator = field.getRandomHead();

        const attackerUnit = selectedAttackerIterator.unit();
        const selectedAttackerSide = selectedAttackerIterator.getSide();

        const enemySide = selectedAttackerSide === 'ally' ? 'enemy' : 'ally';

        const enemyUnit = selectedAttackerIterator.currentRow()[enemySide].lookup();

        if (enemyUnit) {
            attackerUnit.performAttack(enemyUnit);
            if (enemyUnit.health > 0) enemyUnit.performAttack(attackerUnit);
        }

        const rows = field.getAll();
        for (const row of rows) {
            const {ally, enemy} = row;

            for (let i = 0; i < ally.length - 1; i++) {
                const unit = ally[i];

                runWithProbability(
                    () => unit.performSpecial(stepContext, field),
                    unit.meta.specialProbability,
                );
            }

            for (let i = 0; i < enemy.length - 1; i++) {
                const unit = enemy[i];

                runWithProbability(
                    () => unit.performSpecial(stepContext, field),
                    unit.meta.specialProbability,
                );
            }
        }
    }
}

class GameAdapter {
    constructor() {}

    run(army: [UnitKey[], UnitKey[]], size = 4) {
        const game = new Game();

        const [preparedAlly, preparedEnemy] = this.transform(army, size);

        const factory = new UnitFactory();
        const ally = preparedAlly.map(r => r.map(id => factory.get(id)));
        const enemy = preparedEnemy.map(r => r.map(id => factory.get(id)));

        const gameResults = game.run({
            ally,
            enemy,
            formation: 'single_row',
        });

        return gameResults;
    }

    private transform = (army: [UnitKey[], UnitKey[]], size = 4): [UnitKey[][], UnitKey[][]] => {
        const [fAlly, fEnemy] = army;

        const rAlly = Array.from({length: size}, () => []) as UnitKey[][];
        const rEnemy = Array.from({length: size}, () => []) as UnitKey[][];

        for (let i = 0; i < fAlly.length; i++) {
            rAlly[i % 4].push(fAlly[i]);
        }

        for (let i = 0; i < fEnemy.length; i++) {
            rEnemy[i % 4].push(fEnemy[i]);
        }

        return [rAlly, rEnemy];
    };
}

export const startGame = (army: [UnitKey[], UnitKey[]], size = 4) => {
    const game =  new GameAdapter();

    return game.run(army, size);
};
