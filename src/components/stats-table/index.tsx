import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { AbilityChip, ItemChip, MoveChip, NatureChip, PokemonChip } from '../ps-chip';
import { WinUsage } from '../../utility/ps-data';

const formatPercentage = (percentage: number) => {
    return Math.round((percentage + Number.EPSILON) * 100) / 100
};

interface Row {
  id: string;
  usage: number;
  win: number;
}

const sortValueMappers: Partial<Record<keyof Row, (row: Row) => string | number>> = {
  win: (row) => row.win / row.usage,
};

function descendingComparator(a: Row, b: Row, orderBy: keyof Row) {
  const valueMapper = sortValueMappers[orderBy] || ((row: Row) => (row[orderBy]));
  if (valueMapper(b) < valueMapper(a)) {
    return -1;
  }
  if (valueMapper(b) > valueMapper(a)) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

const getComparator = (
  order: Order,
  orderBy: keyof Row,
): (
  a: Row,
  b: Row,
) => number => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type RowHeader = keyof Row;

interface HeadCell {
  disablePadding: boolean;
  id: keyof Row;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'usage',
    numeric: true,
    disablePadding: false,
    label: 'Usage',
  },
  {
    id: 'win',
    numeric: true,
    disablePadding: false,
    label: 'Winrate',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: RowHeader) => void;
  order: Order;
  orderBy: string;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: RowHeader) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type StatType = 'pokemon' | 'item' | 'ability' | 'nature' | 'move';

const typeChipMap: Record<StatType, React.JSXElementConstructor<{ id: string }>> = {
  ability: AbilityChip,
  item: ItemChip,
  move: MoveChip,
  nature: NatureChip,
  pokemon: PokemonChip,
};

const StatsTable = ({ type, total, stats }: { type: StatType, total: number, stats: Record<string, WinUsage> }) => {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<RowHeader>('usage');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const rows: Row[] = Object.entries(stats).map(([name, individualStats]) => ({
    id: name,
    usage: individualStats.usage,
    win: individualStats.win,
  }));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: RowHeader,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {rows.slice().sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      {React.createElement(typeChipMap[type], { id: row.id })}
                    </TableCell>
                    <TableCell align="right"><Tooltip title={`${row.usage} games out of ${total}`}><Chip size='small' label={`${formatPercentage(100 * (row.usage / total))}%`} /></Tooltip></TableCell>
                    <TableCell align="right"><Tooltip title={`${row.win} games out of ${row.usage}`}><Chip size='small' label={`${formatPercentage(100 * (row.win / row.usage))}%`} /></Tooltip></TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 40, 60, 80, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default StatsTable;
