import React from 'react';
import { isRight } from 'fp-ts/Either';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    Formats,
    Pokedex,
    Stats,
    getAbilities,
    getBattleIconIndex,
    getFormats,
    getItems,
    getMoves,
    getPokedex,
    getStats,
} from './utility/ps-data';
import PsDataContext, { defaultPsData, PsData } from './utility/context';
import PokemonStats from './components/pokemon-stats';
import { PokemonIcon } from './components/ps-icon';
import StatsTable from './components/stats-table';

const getFormatName = (id: string, formats: Formats) => formats[id] ? formats[id].name : id;
const getPokemonName = (id: string, pokedex: Pokedex) => pokedex[id] ? pokedex[id].name : id;

const App = () => {
    const [formatOptions, setFormatOptions] = React.useState<string[]>([]);
    const [formatSelection, setFormatSelection] = React.useState<string>('');
    const [yearOptions, setYearOptions] = React.useState<string[]>([]);
    const [yearSelection, setYearSelection] = React.useState<string>('');
    const [monthOptions, setMonthOptions] = React.useState<string[]>([]);
    const [monthSelection, setMonthSelection] = React.useState<string>('');
    const [dayOptions, setDayOptions] = React.useState<string[]>([]);
    const [daySelection, setDaySelection] = React.useState<string>('');
    const [pokemonSelection, setPokemonSelection] = React.useState<string>('');
    const [stats, setStats] = React.useState<Stats>();
    const { pokedex, formats } = React.useContext(PsDataContext);

    const onFormatChange = (event: SelectChangeEvent) => {
        setFormatSelection(event.target.value);
        setYearOptions([]);
        setYearSelection('');
        setMonthOptions([]);
        setMonthSelection('');
        setDayOptions([]);
        setDaySelection('');
        setPokemonSelection('');
        if (!event.target.value) return;
        getStats(event.target.value)
            .then((result) => {
                if (isRight(result)) {
                    setStats(result.right);
                    setYearOptions(result.right.subsections);
                }
            });
    };

    const onYearChange = (event: SelectChangeEvent) => {
        setYearSelection(event.target.value);
        setMonthOptions([]);
        setMonthSelection('');
        setDayOptions([]);
        setDaySelection('');
        setPokemonSelection('');
        if (!event.target.value) return;
        getStats(formatSelection, event.target.value)
            .then((result) => {
                if (isRight(result)) {
                    setStats(result.right);
                    setMonthOptions(result.right.subsections);
                }
            });
    };

    const onMonthChange = (event: SelectChangeEvent) => {
        setMonthSelection(event.target.value);
        setDayOptions([]);
        setDaySelection('');
        setPokemonSelection('');
        if (!event.target.value) return;
        getStats(formatSelection, yearSelection, event.target.value)
            .then((result) => {
                if (isRight(result)) {
                    setStats(result.right);
                    setDayOptions(result.right.subsections);
                }
            });
    };

    const onDayChange = (event: SelectChangeEvent) => {
        setDaySelection(event.target.value);
        setPokemonSelection('');
        if (!event.target.value) return;
        getStats(formatSelection, yearSelection, monthSelection, event.target.value)
            .then((result) => {
                if (isRight(result)) {
                    setStats(result.right);
                }
            });
    };

    React.useEffect(() => {
        getStats()
            .then((result) => {
                if (isRight(result)) {
                    setStats(result.right);
                    setFormatOptions(result.right.subsections);
                }
            });
    }, []);

    const pokemonList = stats && 'totalTeams' in stats
        ? Object.keys(stats.pokemonStats).sort()
        : [];

    return <Container maxWidth='md'>
        <Paper elevation={3}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="format-select-label">Format</InputLabel>
                <Select
                    labelId="format-select-label"
                    id="format-select"
                    value={formatSelection}
                    label='Format'
                    onChange={onFormatChange}
                >
                    <MenuItem key={`format-option-none`} value=''><em>{'None'}</em></MenuItem>
                    {
                        formatOptions.map((formatOption) =>
                            <MenuItem key={`format-option-${formatOption}`} value={formatOption}>
                                <em>{getFormatName(formatOption, formats)}</em>
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={yearSelection}
                    label='Year'
                    onChange={onYearChange}
                >
                    <MenuItem key={`year-option-none`} value=''><em>{'None'}</em></MenuItem>
                    {
                        yearOptions.map((yearOption) =>
                            <MenuItem key={`year-option-${yearOption}`} value={yearOption}><em>{yearOption}</em></MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={monthSelection}
                    label='Month'
                    onChange={onMonthChange}
                >
                    <MenuItem key={`month-option-none`} value=''><em>{'None'}</em></MenuItem>
                    {
                        monthOptions.map((monthOption) =>
                            <MenuItem key={`month-option-${monthOption}`} value={monthOption}><em>{monthOption}</em></MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="day-select-label">Day</InputLabel>
                <Select
                    labelId="day-select-label"
                    id="day-select"
                    value={daySelection}
                    label='Day'
                    onChange={onDayChange}
                >
                    <MenuItem key={`day-option-none`} value=''><em>{'None'}</em></MenuItem>
                    {
                        dayOptions.map((dayOption) =>
                            <MenuItem key={`day-option-${dayOption}`} value={dayOption}><em>{dayOption}</em></MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="pokemon-select-label">Pokémon</InputLabel>
                <Select
                    labelId="pokemon-select-label"
                    id="pokemon-select"
                    value={pokemonSelection}
                    label='Pokémon'
                    onChange={(event) => setPokemonSelection(event.target.value)}
                >
                    <MenuItem key={`pokemon-option-none`} value=''><PokemonIcon id='' /><em>{'None'}</em></MenuItem>
                    {
                        pokemonList.map((pokemonOption) =>
                            <MenuItem key={`pokemon-option-${pokemonOption}`} value={pokemonOption}>
                                <PokemonIcon id={pokemonOption} />
                                <em>{getPokemonName(pokemonOption, pokedex)}</em>
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <Divider />
            {
                (stats && 'totalTeams' in stats && pokemonSelection) ? <PokemonStats stats={stats.pokemonStats[pokemonSelection]} /> : <></>
            }
            {
                (stats && 'totalTeams' in stats && !pokemonSelection) ? <StatsTable type='pokemon' total={stats.totalTeams} stats={stats.pokemonStats} /> : <></>
            }
        </Paper>
    </Container>;
};

const AppWithContext = () => {
    const [psData, setPsData] = React.useState<PsData>(defaultPsData);

    React.useEffect(() => {
        getAbilities().then((result) => {
            if (isRight(result)) {
                setPsData((previousPsData) => ({
                    ...previousPsData,
                    abilities: result.right,
                }));
            }
        });
        getBattleIconIndex().then((result) => {
            if (isRight(result)) {
                setPsData((previousPsData) => ({
                    ...previousPsData,
                    battleIconIndexes: result.right,
                }));
            }
        });
        getFormats().then((result) => {
            if (isRight(result)) {
                setPsData((previousPsData) => ({
                    ...previousPsData,
                    formats: result.right,
                }));
            }
        });
        getItems().then((result) => {
            if (isRight(result)) {
                setPsData((previousPsData) => ({
                    ...previousPsData,
                    items: result.right,
                }));
            }
        });
        getMoves().then((result) => {
            if (isRight(result)) {
                setPsData((previousPsData) => ({
                    ...previousPsData,
                    moves: result.right,
                }));
            }
        });
        getPokedex().then((result) => {
            if (isRight(result)) {
                setPsData((previousPsData) => ({
                    ...previousPsData,
                    pokedex: result.right,
                }));
            }
        });
    }, []);

    return <ThemeProvider theme={createTheme({ palette: { mode: 'light' } })}>
        <PsDataContext.Provider value={psData}>
            <App />
        </PsDataContext.Provider>
    </ThemeProvider>;
};

export default AppWithContext;
