import React, {useReducer} from 'react';
import {META_REGISTRY} from 'src/packages/game/shared/MetaRegistry';
import {UnitKey} from 'src/packages/game/shared/UnitFactory';


export type SelectArmyProps = {
    onSelect: (x: [UnitKey[], UnitKey[]]) => void;
}

type Action = {
    type: 'ADD',
    payload: UnitKey,
} | {
    type: 'RESET',
    payload: null,
}

const UNIT_KEYS = Object.keys(META_REGISTRY) as UnitKey[];
const COST = 100;

type StateType = {
    cost: number,
    items: UnitKey[]
};
const DEFAULT_STATE: StateType = {
    cost: 0,
    items: [],
};

export const SelectArmy = ({onSelect}: SelectArmyProps) => {
    const [army, dispatch] = useReducer<React.Reducer<StateType, Action>>(
        (state, action) => {
            switch (action.type) {
            case 'ADD':
                return {
                    cost: state.cost + META_REGISTRY[action.payload].cost,
                    items: [...state.items, action.payload],
                };
            case 'RESET':
                return DEFAULT_STATE;
            }
        },
        DEFAULT_STATE,
    );

    const addUnit = (k: UnitKey) =>
        dispatch({type: 'ADD', payload: k});

    const reset = () =>
        dispatch({type: 'RESET', payload: null});

    return (
        <div>
            <div className="button-row">
                <button
                    className="button"
                    disabled={!army.items.length}
                    onClick={reset}
                >
                    Reset
                </button>

                <button
                    className="button"
                    disabled={!army.items.length}
                    onClick={() => {
                        const reversed = [...army.items].reverse();

                        onSelect([reversed, reversed]);
                    }}
                >
                    Submit
                </button>
            </div>

            <div className="button-row">
                {UNIT_KEYS.map(k => (
                    <button
                        className="button"
                        key={k}
                        disabled={army.cost >= COST}
                        onClick={() => addUnit(k)}
                    >
                        Add {k}
                    </button>
                ))}
            </div>

            <div style={{textAlign: 'center'}}>
                <p>maxCost: {COST}</p>
                <p>current: {army.cost}</p>

                <ul>
                    units:
                    {army.items.map((k, i) =>
                        <li key={i}>{k}</li>,
                    )}
                </ul>
            </div>
        </div>
    );
};
