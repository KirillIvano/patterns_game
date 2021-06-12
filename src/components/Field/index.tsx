import React from 'react';

import {GameSnapshot} from 'src/packages/game/Game';
import {SpecialHistoryEntry} from 'src/packages/game/interfaces/IUnit';

import {Unit, UnitProps} from '../Unit';
import './styles.scss';


export type FieldProps = {
    snapshot: GameSnapshot;
    prevPerks: SpecialHistoryEntry[];
}

const getStatuses = (prevPerks: SpecialHistoryEntry[]): Record<number, string[]> => {
    const res: Record<number, string[]> = {};

    for (const entry of prevPerks) {
        const {source, target, type: specialType} = entry;

        res[source] = res[source] ?? [];
        res[target] = res[target] ?? [];

        res[source].push(`${specialType} to ${target}`);
        res[target].push(`${specialType} by ${source}`);
    }

    return res;
};

const getUnits = (snapshot: GameSnapshot, statuses: Record<number, string[]>) =>
    snapshot.reduce<[UnitProps[], UnitProps[]]>((acc, row, rowInd) => {
        const [ally, enemy] = row;
        const reversedEnemy = [...enemy].reverse();

        for (let i = 0; i < ally.length; i++) {
            const unit = ally[i];

            acc[0].push({
                ...unit,
                posX: ally.length - 1 - i,
                posY: rowInd,
                side: 'ally',
                statuses: statuses[unit.id],
            });
        }

        for (let i = 0; i < reversedEnemy.length; i++) {
            const unit = reversedEnemy[i];

            acc[1].push({
                ...unit,
                posX: i,
                posY: rowInd,
                side: 'enemy',
                statuses: statuses[unit.id],
            });
        }

        return acc;
    }, [[], []]);


export const Field = ({snapshot, prevPerks}: FieldProps) => {
    const rowsLen = snapshot.length;

    const statuses = getStatuses(prevPerks);
    const units = getUnits(snapshot, statuses);

    const [ally, enemy] = units;

    return (
        <div className="field" style={{height: `${rowsLen * 210}px`}}>
            <div className="field__row field__row_left">
                {ally.map(props => <Unit key={props.id} {...props} />)}
            </div>

            <div className="field__row field__row_right">
                {enemy.map(props => <Unit key={props.id} {...props} />)}
            </div>
        </div>
    );
};
