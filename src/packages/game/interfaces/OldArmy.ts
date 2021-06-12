import {GameFormation} from '@/common/types';

import {IUnit} from './IUnit';


export interface IUnitRow extends Array<IUnit> {
    lookup(): IUnit | undefined;
}

type IFieldRow = [IUnitRow, IUnitRow];

export interface IArmy {
    getRowsCount(): number;
    getRowByInd(ind: number): IFieldRow;
    getAllRows(): IFieldRow[];
    getNeighbours(unit: IUnit): IUnit[];

    reorder(): void;
}

class UnitRow extends Array implements IUnitRow {
    lookup() {
        return this[this.length - 1];
    }
}


export class Army implements IArmy {
    private _rows: IFieldRow[];

    constructor(
        ally: IUnit[][],
        enemies: IUnit[][],
    ) {
        this._rows = this.prepareRows(ally, enemies);
    }


    private prepareRows(
        ally: IUnit[][],
        enemy: IUnit[][],
    ): IFieldRow[] {
        const rows: IFieldRow[] = [];
        const len = Math.max(ally.length, enemy.length);

        for (let i = 0; i < len; i++) {
            rows.push([
                new UnitRow(...(ally[i] as any)),
                new UnitRow(...(enemy[i] as any)),
            ]);
        }

        return rows;
    }

    getRowsCount() {
        return this._rows.length;
    }
    getAllRows() {
        return this._rows;
    }
    getRowByInd(ind: number): IFieldRow {
        return this._rows[ind];
    }

    getNeighboursFromRow(unit: IUnit, row: IUnitRow) {
        const rowLen = row.length;

        for (let i = 0; i < rowLen; i++) {
            if (unit === row[i]) {  
                const prev = row[i - 1];
                const next = row[i + 1];
                const neighbours = [];

                prev && neighbours.push(prev);
                next && neighbours.push(next);

                return neighbours;
            }
        }
    }

    getNeighbours(unit: IUnit): IUnit[] {
        for (const row of this._rows) {
            const [ally, enem] = row;
            const neighbours = this.getNeighboursFromRow(unit, ally) || this.getNeighboursFromRow(unit, enem);

            if (neighbours) return neighbours;
        }

        return [];
    }

    reorder() {

    }
}

class IReorderStrategy {

}