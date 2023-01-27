import React from 'react';
import PsDataContext from '../../utility/context';

const itemIconSheet = 'https://clover.weedl.es/sprites/itemicons-sheet.png?g8';

const ItemIcon = ({ id }: { id: string }) => {
    const { items } = React.useContext(PsDataContext);
    const num = items[id]?.spritenum || 0;

    const top = Math.floor(num / 16) * 24;
    const left = (num % 16) * 24;
    return <span
        className="item-icon"
        style={{
            background: `transparent url(${itemIconSheet}) no-repeat scroll -${left}px -${top}px`,
        }}
    />;
};

export default ItemIcon;
