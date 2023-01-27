import * as t from 'io-ts';
import { Either, isRight, left, right } from 'fp-ts/Either';
import Axios from 'axios';
import toID from './id';

const BASE_URL = 'https://clover.weedl.es';

const winUsageType = t.type({
  usage: t.number,
  win: t.number,
});
export type WinUsage = t.TypeOf<typeof winUsageType>;

const pokemonStatsType = t.intersection([
  winUsageType,
  t.type({
    partner: t.record(t.string, winUsageType),
    against: t.record(t.string, winUsageType),
    item: t.record(t.string, winUsageType),
    ability: t.record(t.string, winUsageType),
    nature: t.record(t.string, winUsageType),
    move: t.record(t.string, winUsageType),
  }),
]);
export type PokemonStats = t.TypeOf<typeof pokemonStatsType>;

const statsType = t.union([
  t.type({
    subsections: t.array(t.string),
  }),
  t.type({
    subsections: t.array(t.string),
    totalTeams: t.number,
    pokemonStats: t.record(t.string, pokemonStatsType),
  }),
]);
export type Stats = t.TypeOf<typeof statsType>;

const battleIconIndexesType = t.type({
  indexes: t.record(t.string, t.number),
  indexesLeft: t.record(t.string, t.number),
});
export type BattleIconIndexes = t.TypeOf<typeof battleIconIndexesType>;

const moveType = t.intersection([
    t.type({
        name: t.string,
        type: t.string,
        category: t.union([
            t.literal('Physical'),
            t.literal('Special'),
            t.literal('Status'),
        ]),
    }),
    t.partial({
        basePower: t.number,
        accuracy: t.union([t.number, t.literal(true)]),
        shortDesc: t.string,
        desc: t.string,
    }),
]);
export type Move = t.TypeOf<typeof moveType>;

const movesType = t.record(t.string, moveType);
export type Moves = t.TypeOf<typeof movesType>;

const pokemonType = t.intersection([
t.type({
    name: t.string,
    num: t.number,
    types: t.array(t.string),
    abilities: t.partial({
        0: t.string,
        1: t.string,
        H: t.string,
        S: t.string,
    }),
    baseStats: t.type({
        hp: t.number,
        atk: t.number,
        def: t.number,
        spa: t.number,
        spd: t.number,
        spe: t.number,
    }),
    }),
    t.partial({
        forme: t.string,
        cosmeticFormes: t.array(t.string),
    }),
]);
export type Pokemon = t.TypeOf<typeof pokemonType>;

const pokedexType = t.record(t.string, pokemonType);
export type Pokedex = t.TypeOf<typeof pokedexType>;

const itemsType = t.record(t.string, t.intersection([
    t.type({
        name: t.string,
        spritenum: t.number,
    }),
    t.partial({
        shortDesc: t.string,
        desc: t.string,
    }),
]));
export type Items = t.TypeOf<typeof itemsType>;

const abilitiesType = t.record(t.string, t.intersection([
    t.type({
        name: t.string,
    }),
    t.partial({
        shortDesc: t.string,
        desc: t.string,
    }),
]));
export type Abilities = t.TypeOf<typeof abilitiesType>;

const rawFormatsType = t.array(t.union([
    t.type({
        section: t.string,
    }),
    t.type({
        name: t.string,
    }),
]));
export type RawFormats = t.TypeOf<typeof rawFormatsType>;
export type Formats = Record<string, { name: string }>;

export const getStats = async (
  format?: string,
  year?: string,
  month?: string,
  day?: string,
): Promise<Either<{ error: string }, Stats>> => {
  try {
    const path = [format, year, month, day]
      .filter((value) => value !== undefined).join('/');
    const url = `${BASE_URL}/usage/${path}/index.json`;

    const { data } = await Axios.get(url, {
      responseType: 'json',
    });

    const decodedStats = statsType.decode(data);

    if (isRight(decodedStats)) {
      return decodedStats;
    }
  } catch(error) {}

  return left({ error: 'Unknown error occured.' });
};

let cachedBattleIconIndexes: BattleIconIndexes;

export const getBattleIconIndex = async (): Promise<Either<{ error: string }, BattleIconIndexes>> => {
  try {
    if (cachedBattleIconIndexes) return right(cachedBattleIconIndexes);
  
    const url = `${BASE_URL}/data/battle-icons.json`;

    const { data } = await Axios.get(url, {
      responseType: 'json',
    });

    const decodedBattleIconIndexes = battleIconIndexesType.decode(data);

    if (isRight(decodedBattleIconIndexes)) {
      cachedBattleIconIndexes = decodedBattleIconIndexes.right;
      return decodedBattleIconIndexes;
    }
  } catch (error) {}

  return left({ error: 'Unknown error occured.' });
};

let cachedMoves: Moves;

export const getMoves = async (): Promise<Either<{ error: string }, Moves>> => {
  try {
    if (cachedMoves) return right(cachedMoves);
  
    const url = `${BASE_URL}/data/moves.json`;

    const { data } = await Axios.get(url, {
      responseType: 'json',
    });

    const decodedMoves = movesType.decode(data);

    if (isRight(decodedMoves)) {
      cachedMoves = decodedMoves.right;
      return decodedMoves;
    }
  } catch (error) {}

  return left({ error: 'Unknown error occured.' });
};

let cachedPokedex: Pokedex;

export const getPokedex = async (): Promise<Either<{ error: string }, Pokedex>> => {
  try {
    if (cachedPokedex) return right(cachedPokedex);
  
    const url = `${BASE_URL}/data/pokedex.json`;

    const { data } = await Axios.get(url, {
      responseType: 'json',
    });

    const decodedPokedex = pokedexType.decode(data);

    if (isRight(decodedPokedex)) {
      cachedPokedex = decodedPokedex.right;
      return decodedPokedex;
    }
  } catch (error) {}

  return left({ error: 'Unknown error occured.' });
};

let cachedItems: Items;

export const getItems = async (): Promise<Either<{ error: string }, Items>> => {
  try {
    if (cachedItems) return right(cachedItems);
  
    const url = `${BASE_URL}/data/items.json`;

    const { data } = await Axios.get(url, {
      responseType: 'json',
    });

    const decodedItems = itemsType.decode(data);

    if (isRight(decodedItems)) {
      cachedItems = decodedItems.right;
      return decodedItems;
    }
  } catch (error) {}

  return left({ error: 'Unknown error occured.' });
};

let cachedAbilities: Abilities;

export const getAbilities = async (): Promise<Either<{ error: string }, Abilities>> => {
  try {
    if (cachedAbilities) return right(cachedAbilities);
  
    const url = `${BASE_URL}/data/abilities.json`;

    const { data } = await Axios.get(url, {
      responseType: 'json',
    });

    const decodedAbilities = abilitiesType.decode(data);

    if (isRight(decodedAbilities)) {
        cachedAbilities = decodedAbilities.right;
      return decodedAbilities;
    }
  } catch (error) {}

  return left({ error: 'Unknown error occured.' });
};

let cachedFormats: Formats;

export const getFormats = async (): Promise<Either<{ error: string }, Formats>> => {
  try {
    if (cachedFormats) return right(cachedFormats);
  
    const url = `${BASE_URL}/data/formats.json`;

    const { data } = await Axios.get(url, {
      responseType: 'json',
    });

    const decodedFormats = rawFormatsType.decode(data);

    if (isRight(decodedFormats)) {
        cachedFormats = decodedFormats.right
            .filter((format) => 'name' in format)
            .reduce((formats, format) => {
                if ('name' in format) {
                    formats[toID(format.name)] = format;
                }
                
                return formats;
            }, {} as Formats);

        return right(cachedFormats);
    }
  } catch (error) {}

  return left({ error: 'Unknown error occured.' });
};
