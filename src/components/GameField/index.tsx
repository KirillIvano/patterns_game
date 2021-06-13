import React, {useState} from 'react';

import {AppStateData} from 'src/App';
import {Field} from 'src/components/Field';


export const GameField = ({history, perksHistory}: AppStateData['game']) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
