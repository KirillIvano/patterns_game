import {Field} from 'src/components/Field';
import React, {useState} from 'react';

import {GameSnapshot, startGame} from 'src/packages/game/Game';
import './styles.scss';
import {SpecialHistoryEntry} from 'src/packages/game/interfaces/IUnit';


const Preview = ({handleClick}: {handleClick: () => void}) => {
    return (
        <div style={{padding: '100px 20px', display: 'flex', justifyContent: 'center'}}>
            <button className="button" onClick={handleClick}>Generate</button>
        </div>
    );
};

const App = () => {
    const [history, setHistory] = useState<null | GameSnapshot[]>(null);
    const [perksHistory, setPerksHistory] = useState<null | SpecialHistoryEntry[][]>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = () => {
        const {history, perksHistory} = startGame();

        setHistory(history);
        setPerksHistory(perksHistory);
    };

    if (!history || !perksHistory) return <Preview handleClick={handleClick} />;

    const handlePrev = () => setCurrentIndex(s => Math.max(0, s - 1));
    const handleNext = () => setCurrentIndex(s => Math.min(history.length - 1, s + 1));
    const handleEnd = () => setCurrentIndex(history.length - 1);

    return (
        <div className="app__field">
            <div className="button-row">
                <button
                    className="button"
                    disabled={currentIndex <= 0}
                    onClick={handlePrev}
                >
                    prev
                </button>

                <button
                    className="button"
                    disabled={currentIndex >= history.length - 1}
                    onClick={handleNext}
                >
                    next
                </button>

                <button
                    className="button"
                    disabled={currentIndex >= history.length - 1}
                    onClick={handleEnd}
                >
                    end
                </button>
            </div>

            <Field
                prevPerks={perksHistory[currentIndex - 1] ?? []}
                snapshot={history[currentIndex]}
            />

            <div className="shadow shadow_left"></div>
            <div className="shadow shadow_right"></div>
        </div>
    );
};

export default App;
