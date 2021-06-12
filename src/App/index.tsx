import {Field} from 'src/components/Field';
import React, {useState} from 'react';

import {GameSnapshot, startGame} from 'src/packages/game/Game';
import './styles.scss';

const App = () => {
    const [history, setHistory] = useState<null | GameSnapshot[]>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = () => {
        const res = startGame();
        setHistory(res);
    };

    if (!history) return <button className="button" onClick={handleClick}>kek</button>;

    const handlePrev = () => setCurrentIndex(s => Math.max(0, s - 1));
    const handleNext = () => setCurrentIndex(s => Math.min(history.length - 1, s + 1));

    return (
        <div className="app__field">
            <Field snapshot={history[currentIndex]} />

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
        </div>
    );
};

export default App;
