import React from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import PsDataContext from '../../utility/context';

const ItemChip = ({ id, onClick }: { id: string, onClick?: () => void }) => {
    const { abilities } = React.useContext(PsDataContext);
    const name = abilities[id]?.name || id;
    const desc = abilities[id]?.shortDesc || abilities[id]?.desc;

    const chip = <Chip
        sx={{
            '&.MuiChip-root': {
            height: 38,
            },
        }}
        label={name}
        onClick={onClick}
    />;

    if (desc) {
        return <Tooltip title={desc} placement='right'>{chip}</Tooltip>;
    }

    return chip;
};

export default ItemChip;
