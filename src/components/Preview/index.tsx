import React from 'react';


export const Preview = ({handleClick}: {handleClick: () => void}) => (
    <div style={{padding: '100px 20px', display: 'flex', justifyContent: 'center'}}>
        <button
            className="button"
            onClick={handleClick}
        >
            START
        </button>
    </div>
);
