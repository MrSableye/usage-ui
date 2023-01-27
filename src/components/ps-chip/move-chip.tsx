import React from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { CategoryIcon, TypeIcon } from '../ps-icon'
import { Move } from '../../utility/ps-data';
import PsDataContext from '../../utility/context';

const MoveChipTooltip = ({ move }: { move: Move }) => {
    const desc = move.shortDesc || move.desc;
    return <div>
        <div><strong>Type:</strong> <TypeIcon style={{verticalAlign: 'bottom'}} id={move.type} /></div>
        <div><strong>Category:</strong> <CategoryIcon style={{verticalAlign: 'bottom'}} id={move.category} /></div>
        <div><strong>BP:</strong> {move.basePower || '—'}</div>
        <div><strong>Acc:</strong> {move.accuracy === true ? '—' : move.accuracy}</div>
        {desc ? <div>{desc}</div> : <></>}
    </div>
};

const MoveChip = ({ id, onClick }: { id: string, onClick?: () => void }) => {
    const { moves } = React.useContext(PsDataContext);
    const move = moves[id];
    const name = move?.name || id;

    const chip = <Chip
        sx={{
            '&.MuiChip-root': {
            height: 38,
            },
        }}
        label={name}
        onClick={onClick}
    />;

    if (move) {
        return <Tooltip title={<MoveChipTooltip move={move} />} placement='right'>{chip}</Tooltip>;
    }

    return chip;
};

export default MoveChip;
