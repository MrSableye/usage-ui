import React from 'react';

const categoryBaseUrl = 'https://clover.weedl.es/sprites/categories/';

const CategoryIcon = ({ id, style }: { id: string, style?: React.CSSProperties }) => {
    const name = id.substring(0, 1).toUpperCase() + id.substring(1);
    return <img
        src={`${categoryBaseUrl}${name.replace(/\?/g, '%3f')}.png`}
        alt={name}
        height="14"
        width="32"
        style={{ ...style, imageRendering: 'pixelated'}}
    />
};

export default CategoryIcon;
