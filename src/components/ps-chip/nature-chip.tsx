import React from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

type Nature = { name: string } | { name: string, plus: string, minus: string };

const natures: Record<string, Nature> = {
	adamant: { name: 'Adamant', plus: 'Atk', minus: 'SpA' },
	bashful: { name: 'Bashful' },
	bold: { name: 'Bold', plus: 'Def', minus: 'Atk' },
	brave: { name: 'Brave', plus: 'Atk', minus: 'Spe' },
	calm: { name: 'Calm', plus: 'SpD', minus: 'Atk' },
	careful: { name: 'Careful', plus: 'SpD', minus: 'SpA' },
	docile: { name: 'Docile' },
	gentle: { name: 'Gentle', plus: 'SpD', minus: 'Def' },
	hardy: { name: 'Hardy' },
	hasty: { name: 'Hasty', plus: 'Spe', minus: 'Def' },
	impish: { name: 'Impish', plus: 'Def', minus: 'SpA' },
	jolly: { name: 'Jolly', plus: 'Spe', minus: 'SpA' },
	lax: { name: 'Lax', plus: 'Def', minus: 'SpD' },
	lonely: { name: 'Lonely', plus: 'Atk', minus: 'Def' },
	mild: { name: 'Mild', plus: 'SpA', minus: 'Def' },
	modest: { name: 'Modest', plus: 'SpA', minus: 'Atk' },
	naive: { name: 'Naïve', plus: 'Spe', minus: 'SpD' },
	naughty: { name: 'Naughty', plus: 'Atk', minus: 'SpD' },
	quiet: { name: 'Quiet', plus: 'SpA', minus: 'Spe' },
	quirky: { name: 'Quirky' },
	rash: { name: 'Rash', plus: 'SpA', minus: 'SpD' },
	relaxed: { name: 'Relaxed', plus: 'Def', minus: 'Spe' },
	sassy: { name: 'Sassy', plus: 'SpD', minus: 'Spe' },
	serious: { name: 'Serious' },
	timid: { name: 'Timid', plus: 'Spe', minus: 'Atk' },
};

const NatureChip = ({ id, onClick }: { id: string, onClick?: () => void }) => {
    const nature = natures[id];
    const name = nature?.name || (id.length ? id : 'None');
    const desc = nature && 'plus' in nature
        ? `+${nature.plus}, -${nature.minus}`
        : undefined; 

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

export default NatureChip;
