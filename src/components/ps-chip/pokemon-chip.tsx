import React from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { Pokemon } from '../../utility/ps-data';
import PsDataContext from '../../utility/context';
import { PokemonIcon, TypeIcon } from '../ps-icon';

const PokemonChipTooltip = ({ pokemon }: { pokemon: Pokemon }) => {
    const abilities = [pokemon.abilities[0], pokemon.abilities[1], pokemon.abilities.H, pokemon.abilities.S]
        .filter((ability) => ability !== undefined);
    const stats = [pokemon.baseStats.hp, pokemon.baseStats.atk, pokemon.baseStats.def, pokemon.baseStats.spa, pokemon.baseStats.spd, pokemon.baseStats.spe];
    const total = stats.reduce((totalStats, stat) => totalStats + stat, 0);
    return <div>
        <div style={{verticalAlign: 'bottom'}}><strong>Types:</strong> {pokemon.types.map((type, typeIndex) => <TypeIcon key={`${type}-${typeIndex}`} style={{verticalAlign: 'bottom'}} id={type} />)}</div>
        <div><strong>Abilities:</strong> {abilities.join('/')}</div>
        <div><strong>Stats:</strong> {stats.join('/')} ({total})</div>
    </div>
};

const PokemonChip = ({ id, onClick }: { id: string, onClick?: () => void }) => {
    const { pokedex } = React.useContext(PsDataContext);
    const pokemon = pokedex[id];
    const name = pokemon?.name || id;

    const chip = <Chip
        sx={{
            '&.MuiChip-root': {
            height: 38,
            },
        }}
        icon={<div style={{paddingLeft: 2}}><PokemonIcon id={id} /></div>}
        label={name}
        onClick={onClick}
    />;

    if (pokemon) {
        return <Tooltip title={<PokemonChipTooltip pokemon={pokemon} />} placement='right'>{chip}</Tooltip>;
    }

    return chip;
};

export default PokemonChip;
