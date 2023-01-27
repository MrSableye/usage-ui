import React from 'react';
import { BattleIconIndexes, Pokedex } from '../../utility/ps-data';
import PsDataContext from '../../utility/context';

const getPokemonIconNum = (id: string, pokedex: Pokedex, battleIconIndexes: BattleIconIndexes) => {
    let num = 0;
    const pokedexEntry = pokedex[id];
    if (pokedexEntry?.num) {
        num = pokedexEntry?.num;
    }
    
    if (num > 69000 && num <= 69386) { // Clovermons
        num = 1379 + (12 * 12) + num % 69000;
    } else if (num < -42000 && num >= -42012) { // Clover CAP memes
        num = 1379 + (48 * 12) + Math.abs(num % 42000);
    } else if (num > 42000 && num <= 42999) { // Clover CAPmons
        num = 1379 + (49 * 12) + num % 42000;
    } else if (num > 1010) {
        num = 0;
    }
    if (num < 0) num = 0;

    if (battleIconIndexes.indexes?.[id]) {
        num = battleIconIndexes.indexes?.[id];
    }

    return num;
}

const pokemonIconSheet = 'https://clover.weedl.es/sprites/pokemonicons-sheet.png?v4';

const PokemonIcon = ({ id }: { id: string }) => {
    const { battleIconIndexes, pokedex } = React.useContext(PsDataContext);
    const num = getPokemonIconNum(id, pokedex, battleIconIndexes);

    const top = Math.floor(num / 12) * 30;
    const left = (num % 12) * 40;
    return <span
        className="pokemon-icon"
        style={{
            background: `transparent url(${pokemonIconSheet}) no-repeat scroll -${left}px -${top}px`,
        }}
    />
};

export default PokemonIcon;
