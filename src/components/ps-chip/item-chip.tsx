import React from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import PsDataContext from '../../utility/context';
import { ItemIcon } from '../ps-icon';

const ItemChip = ({ id, onClick }: { id: string, onClick?: () => void }) => {
    const { items } = React.useContext(PsDataContext);
    const item = items[id];
    const name = item?.name || (id.length ? id : 'None');
    const desc = item?.shortDesc || item?.desc;

    const chip = <Chip
        sx={{
            '&.MuiChip-root': {
            height: 38,
            },
        }}
        icon={<div style={{paddingLeft: 2, paddingTop: 6}}><ItemIcon id={id} /></div>}
        label={name}
        onClick={onClick}
    />;

    if (desc) {
        return <Tooltip title={desc} placement='right'>{chip}</Tooltip>;
    }

    return chip;
};

export default ItemChip;
