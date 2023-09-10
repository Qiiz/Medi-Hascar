import { useState, MouseEvent, ChangeEvent, useMemo } from 'react';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    Paper
} from '@mui/material';
import Row from './Row';


const getVisibleData = (row: Record<string, string>, headers: string[]) => {
    const result: Record<string, string> = {};
    headers.forEach(header => {
        result[header] = row[header] ?? '';
    });
    return result;
}

const getHiddenData = (row: Record<string, string>, headers: string[]) => {
    const result: Record<string, string> = { ...row };
    headers.forEach(header => {
        delete result[header];
    });
    return result;
}

interface BasicTableProps {
    headers: string[];
    rows: Record<string, string>[]; 
    isEditable: boolean; 
    isCollapsible: boolean;
    onEditRow?: (updatedContents: Record<string, string>) => void;
    onDeleteRow?: (rowId: string) => void;
}

export default function BasicTable( props: BasicTableProps ) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const actions = useMemo(() => {
        let result = 0;
        if (props.isEditable) {
            result += 2;
        }
        if (props.isCollapsible) {
            result += 1;
        }
        return result;
    }, [props.isEditable, props.isCollapsible]);

    return (
        <TableContainer component={Paper} sx={{ width: '100%', mt:'20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.headers.map((header) => (
                            <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                                {header}
                            </TableCell>
                        ))}
                        {(actions > 0) &&
                            <TableCell align='left' sx={{ fontWeight: 'bold' }} colSpan={actions} />
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.rows)
                        .map((row) => (
                            <Row
                                id={row[props.headers[0] ?? '']}
                                isEditable={props.isEditable}
                                isCollapsible={props.isCollapsible}
                                visibleData={getVisibleData(row, props.headers)}
                                hiddenData={getHiddenData(row, props.headers)}
                                onEdit={props.onEditRow}
                                onDelete={props.onDeleteRow}
                            />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={props.headers.length + actions}
                            count={props.rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
