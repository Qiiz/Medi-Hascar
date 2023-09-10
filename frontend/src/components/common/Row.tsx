import { Fragment, useState, useMemo } from 'react';
import { 
    Box,
    Collapse,
    IconButton,
    TableCell,
    TableRow,
} from '@mui/material';
import {
    KeyboardArrowDown,
    KeyboardArrowUp
} from '@mui/icons-material';
import CardMUI from '../Card';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { tableCardStyle } from '../../styles';

interface RowProps {
    id: string;
    isEditable: boolean;
    isCollapsible: boolean;
    visibleData: Record<string, string>;
    hiddenData: Record<string, string>;
    onEdit?: (updatedContents: Record<string, string>) => void;
    onDelete?: (id: string) => void;
}


export default function Row( props: RowProps ) {
    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        const result:Record<string, string> = {...props.visibleData, ...props.hiddenData};
        props.onEdit?.(result);
    }

    const handleDelete = () => {
        props.onDelete?.(props.id);
    }

    const collapsibleSpan = useMemo(() => {
        let result = Object.keys(props.visibleData).length;
        if (props.isEditable) {
            result += 2;
        }
        if (props.isCollapsible) {
            result += 1;
        }
        return result;
    }, [props.isEditable, props.isCollapsible]);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>    
                {Object.entries(props.visibleData).map(([key, value]) => (
                    <TableCell key={key} align='left'>{value}</TableCell>
                ))}
                {props.isEditable && (<>
                    <TableCell>
                        <EditButton onClick={handleEdit}/>
                    </TableCell>
                    <TableCell>
                        <DeleteButton onClick={handleDelete}/>
                    </TableCell> 
                </>)}
                {props.isCollapsible && 
                    <TableCell>
                        <IconButton size='small' onClick={() => setOpen(!open)} >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    </TableCell>
                }
            </TableRow>
            {props.isCollapsible && 
                <TableRow>
                    <TableCell sx={{ m: 0, pb: 0, pt: 0 }} colSpan={collapsibleSpan}>
                        <Collapse in={open} timeout='auto' unmountOnExit>
                            <Box>
                                {Object.entries(props.hiddenData).map(([key, value]) => (
                                    <CardMUI key={key} title={key} stat={value} variant={tableCardStyle}/>   
                                ))} 
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow> 
            }
        </>
    );
}
