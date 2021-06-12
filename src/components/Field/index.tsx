import React, {useMemo} from 'react';

import {GameSnapshot} from 'src/packages/game/Game';

import {Unit} from '../Unit';
import './styles.scss';


export type FieldProps = {
    snapshot: GameSnapshot;
}

export const Field = ({snapshot}: FieldProps) => {
    const rowsLen = snapshot.length;

    const [ally, enemies] = snapshot[0];
    const enemiesReversed = useMemo(
        () => [...enemies].reverse(),
        [enemies],
    );

    return (

        <div className="field" style={{['--height']: `${rowsLen}`}}>
            <div className="field__row field__row_left">
                {ally.map((props, ind) =>
                    <Unit
                        {...props}
                        key={props.id}
                        side="ally"
                        posX={ally.length - 1 - ind}
                        posY={0}
                    />,
                )}
            </div>

            <div className="field__row field__row_right">
                {enemiesReversed.map((props, ind) =>
                    <Unit
                        {...props}
                        key={props.id}
                        side="enemy"
                        posX={ind}
                        posY={0}
                    />,
                )}
            </div>
        </div>
    );
};
