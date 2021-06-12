import React from 'react';

import {IUnitSnapshot} from 'src/packages/game/interfaces/IUnit';
import {META_REGISTRY} from 'src/packages/game/shared/MetaRegistry';

import {UNIT_IMAGE_REGISTRY} from './images';
import './styles.scss';


type UnitProps = {
    posY: number;
    posX: number;
    side: 'ally' | 'enemy';
} & IUnitSnapshot;

export const Unit = ({unitType, id, health, posX, posY, side}: UnitProps) => {
    const {name} = META_REGISTRY[unitType];
    const image = UNIT_IMAGE_REGISTRY[unitType];

    const coeff = side === 'ally' ? -1 : 1;

    return (
        <div
            style={{
                transform: `translateX(${coeff * posX * 120}px) translateY(${posY * 200}px)`,
            }}
            className={`unit unit_${side}`}
        >
            <div className="unit__image-wrapper ">
                <img aria-hidden="true" className="unit__image" src={image} />
            </div>
            {id}/{name}: {health}
        </div>
    );
};
