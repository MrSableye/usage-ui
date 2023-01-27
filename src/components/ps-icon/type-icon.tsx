import React from 'react';

const typeBaseUrl = 'https://clover.weedl.es/sprites/types/';

const TypeIcon = ({ id, style }: { id: string, style?: React.CSSProperties }) => {
    const name = id.substring(0, 1).toUpperCase() + id.substring(1);
    return <img
        src={`${typeBaseUrl}${name.replace(/\?/g, '%3f')}.png`}
        alt={name}
        height="14"
        width="32"
        style={{...style, imageRendering: 'pixelated'}}
    />
};

export default TypeIcon;
