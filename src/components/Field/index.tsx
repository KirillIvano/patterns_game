import React from 'react';

import {GameSnapshot} from 'src/packages/game/Game';

import {Unit, UnitProps} from '../Unit';
import './styles.scss';


export type FieldProps = {
    snapshot: GameSnapshot;
}

export const Field = ({snapshot}: FieldProps) => {
    const rowsLen = snapshot.length;

    const units = snapshot.reduce<[UnitProps[], UnitProps[]]>((acc, row, rowInd) => {
        const [ally, enemy] = row;
        const reversedEnemy = [...enemy].reverse();

        for (let i = 0; i < ally.length; i++) {
            acc[0].push({...ally[i], posX: ally.length - 1 - i, posY: rowInd, side: 'ally'});
        }

        for (let i = 0; i < reversedEnemy.length; i++) {
            acc[1].push({...reversedEnemy[i], posX: i, posY: rowInd, side: 'enemy'});
        }

        return acc;
    }, [[], []]);

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
