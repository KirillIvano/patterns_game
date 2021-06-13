import React, {useState} from 'react';

import {GameSnapshot, startGame} from 'src/packages/game/Game';
import './styles.scss';
import {SpecialHistoryEntry} from 'src/packages/game/interfaces/IUnit';
import {Preview} from 'src/components/Preview';
import {UnitKey} from 'src/packages/game/shared/UnitFactory';
import {SelectArmy} from 'src/components/SelectArmy';
import {GameField} from 'src/components/GameField';


export type AppStateData = {
    'preview': null,
    'select_army': null,
    'game': {
        history: GameSnapshot[],
        perksHistory: SpecialHistoryEntry[][],
    }
}
export type AppStatus = keyof AppStateData;


const App = () => {
    const [appState, setAppState] = useState<AppStatus>('preview');
    const [appData, setAppData] = useState<AppStateData[typeof appState]>(null);

    const runGame = (selectedArmy: [UnitKey[], UnitKey[]]) => {
        const res = startGame(selectedArmy, 4);
        setAppData(res);
        setAppState('game');
    };


    if (appState === 'preview') return <Preview handleClick={() => setAppState('select_army')} />;
    if (appState === 'select_army') return <SelectArmy onSelect={runGame} />;

    return (
        <GameField {...(appData as AppStateData['game'])} />
    );
};

export default App;
