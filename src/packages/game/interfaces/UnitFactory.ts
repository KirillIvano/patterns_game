import {IUnit} from './IUnit';
import {Knight} from './Knight';

export type GetUnitId<TUnits extends IUnit> = TUnits['meta']['unitType'];
export type UnitId = GetUnitId<Knight>;


export class UnitFactory {
    createUnit(unitId: string) {

    }
}
