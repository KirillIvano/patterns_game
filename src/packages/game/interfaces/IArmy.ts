import {GameFormation} from 'src/common/types';

import {randomBranch} from '../utils/randomBranch';
import {randomClamp} from '../utils/randomClamp';

import {IRowEntry} from './IRowEntry';
import {IUnit} from './IUnit';


export interface IUnitRow extends Array<IUnit> {
    lookup(): IUnit | undefined;
}

export type IFieldRow = {ally: IUnitRow, enemy: IUnitRow};

class UnitRow extends Array<IUnit> implements IUnitRow {
    lookup() {
        return this[this.length - 1];
    }
}

export class RowEntry implements IRowEntry {
    currentIndex: number;
    allyRow: IUnitRow;

    constructor(
        private readonly _unit: IUnit,
        private readonly _side: 'ally' | 'enemy',
        private readonly _row: IFieldRow,
    ) {
        this.allyRow = _row[_side];
        this.currentIndex = _row[_side].indexOf(_unit);
    }

    currentRow(): IFieldRow {
        return this._row;
    }

    getSide(): 'ally' | 'enemy' {
        return this._side;
    }

    next(): IRowEntry | null {
        const next = this.allyRow[this.currentIndex + 1];

        if (!next) return null;

        return new RowEntry(
            next,
            this._side,
            this._row,
        );
    }

    prev(): IRowEntry | null {
        const prev = this.allyRow[this.currentIndex - 1];

        if (!prev) return null;

        return new RowEntry(
            prev,
            this._side,
            this._row,
        );
    }

    insertAfter(unit: IUnit): void {
        this.allyRow.splice(this.currentIndex, 0, unit);
    }

    unit(): IUnit {
        return this._unit;
    }
}

export interface IArmy {
    getAll(): IFieldRow[];
    getIteratorForUnit(unit: IUnit): IRowEntry;
    getRandomHead(): IRowEntry;
    cleanup(): void;
    check(): boolean;
}

export class Army implements IArmy {
    private _rows: IFieldRow[];

    constructor(
        ally: IUnit[][],
        enemies: IUnit[][],
        formation: GameFormation,
    ) {
        this._rows = this.prepareRows(ally, enemies);
    }

    getAll(): IFieldRow[] {
        return this._rows;
    }

    getIteratorForUnit(unit: IUnit): RowEntry {
        for (let i = 0; i < this._rows.length; i++) {
            for (const side of (['ally', 'enemy'] as const)) {
                for (let j = 0; j < this._rows[i][side].length; j++) {
                    if (this._rows[i][side][j] === unit) {
                        return new RowEntry(
                            unit,
                            side,
                            this._rows[i],
                        );
                    }
                }
            }
        }

        throw new Error('Iterator not found');
    }

    private prepareRows(
        ally: IUnit[][],
        enemy: IUnit[][],
    ): IFieldRow[] {
        const rows: IFieldRow[] = [];
        const len = Math.max(ally.length, enemy.length);

        for (let i = 0; i < len; i++) {
            rows.push({
                ally: new UnitRow(...(ally[i])),
                enemy: new UnitRow(...(enemy[i])),
            });
        }

        return rows;
    }

    getRandomHead(): RowEntry {
        const rowsLen = this._rows.length;

        const rowInd = randomClamp(0, rowsLen - 1);
        const side = randomBranch() ? 'ally' : 'enemy';

        const unit = this._rows[rowInd][side].lookup() as IUnit;

        return new RowEntry(
            unit,
            side,
            this._rows[rowInd],
        );
    }


    cleanup() {
        for (const {ally, enemy} of this._rows) {
            const allyHead = ally.lookup() as IUnit;
            const enemyHead = enemy.lookup() as IUnit;

            if (allyHead.health <= 0) ally.pop();
            if (enemyHead.health <= 0) enemy.pop();
        }

        this.reorder();
    }

    private reorder() {
        const allyStash = [];
        const enemyStash = [];
        const toBeCleared = [];

        const initialRowsLen = this._rows.length;

        for (let i = 0; i < initialRowsLen; i++) {
            const {ally, enemy} = this._rows[i];

            if (ally.length && enemy.length) continue;

            if (!ally.length) enemyStash.push(...enemy);
            if (!enemy.length) allyStash.push(...ally);

            toBeCleared.push(i);
        }

        for (let i = toBeCleared.length - 1; i >= 0; i--) {
            this._rows.splice(i, 1);
        }

        if (!this._rows.length) {
            this._rows.push({ally: new UnitRow(), enemy: new UnitRow()});
        }

        this._rows[0].ally.unshift(...allyStash);
        this._rows[0].enemy.unshift(...enemyStash);
    }

    check(): boolean {
        if (!this._rows.length) return true;
        if (this._rows.length > 1) return false;

        return (
            this._rows[0].ally.length === 0 ||
            this._rows[0].enemy.length === 0
        );
    }
}
