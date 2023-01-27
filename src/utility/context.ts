import * as React from 'react';
import {
    Abilities,
    BattleIconIndexes,
    Formats,
    Items,
    Moves,
    Pokedex,
} from './ps-data';

export interface PsData {
    abilities: Abilities;
    battleIconIndexes: BattleIconIndexes;
    formats: Formats;
    items: Items;
    moves: Moves;
    pokedex: Pokedex;
}

export const defaultPsData = {
    abilities: {},
    battleIconIndexes: { indexes: {}, indexesLeft: {} },
    formats: {},
    items: {},
    moves: {},
    pokedex: {},
};

const PsDataContext = React.createContext<PsData>(defaultPsData);

export default PsDataContext;
