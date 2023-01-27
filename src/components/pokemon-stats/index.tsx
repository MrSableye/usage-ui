import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StatsTable from '../stats-table';
import { PokemonStats } from '../../utility/ps-data';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pokemon-tabpanel-${index}`}
      aria-labelledby={`pokemon-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `pokemon-tab-${index}`,
    'aria-controls': `pokemon-tabpanel-${index}`,
  };
};

const PokemonStatsDisplay = ({ stats }: { stats: PokemonStats }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Pokemon Stats Stats">
          <Tab label="Allies" {...a11yProps(0)} />
          <Tab label="Foes" {...a11yProps(1)} />
          <Tab label="Items" {...a11yProps(2)} />
          <Tab label="Abilities" {...a11yProps(3)} />
          <Tab label="Natures" {...a11yProps(4)} />
          <Tab label="Moves" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <StatsTable type='pokemon' total={stats.usage} stats={stats.partner} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StatsTable type='pokemon' total={stats.usage} stats={stats.against} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StatsTable type='item' total={stats.usage} stats={stats.item} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StatsTable type='ability' total={stats.usage} stats={stats.ability} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StatsTable type='nature' total={stats.usage} stats={stats.nature} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <StatsTable type='move' total={stats.usage} stats={stats.move} />
      </TabPanel>
    </Box>
  );
};

export default PokemonStatsDisplay;
