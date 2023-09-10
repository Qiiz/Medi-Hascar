import { useState, useEffect } from 'react';
import { 
    Box, SxProps,
  } from '@mui/material';
import Header from './components/common/Header';
import AddButton from './components/common/AddButton';
import BasicTable from './components/common/BasicTable';
import ItemDialog from './components/common/ItemDialog';
import DeleteDialog from './components/DeleteDialog';
import { fetchItems, addItem, deleteItem, editItem, createRecord } from './api';
import { Activity } from '../../shared/models';

const uiHeaderNames: Record<keyof Activity, string> = {
    serial_number: 'S/N', // Primary key
    state: 'State',
    equip_name: 'Name',
    borrow_date: 'Borrow Date',
    return_date: 'Return Date',
    status: 'Status'
}

const headers = [
    'S/N',
    'Name',
    'State',
    'Date Borrowed',
    'Date Returned',
    'Status'
]

const defaultItem: Activity = {
    serial_number: '', // Primary key
    state: '',
    equip_name: '',
    borrow_date: '',
    return_date: '',
    status: ''
};

export function createActivityItem(data?: Record<string, string>): Activity {
    const result: Activity = {
        serial_number: '',
        state: '',
        equip_name: '',
        borrow_date: '',
        return_date: '',
        status: ''
    }

    if (!data) {
        return result;
    }
    
    return result;
}

export interface ActivitiesProps {
    headerStyle: SxProps,
    isEditable?: boolean,
    isCollapsible?: boolean
}

export default function Activities(props: ActivitiesProps) {
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);
    const [ rows, setRows ] = useState<Record<string, string>[]>([]);
    const [ rowID, setRowID ] = useState('');
    const [ value, setValue ] = useState<Record<string, string>>(createRecord(defaultItem, uiHeaderNames));

    const handleAdd = () => {
        setValue(createRecord(defaultItem, uiHeaderNames));
        setOpen(true);
    }

    const handleEdit = (row: Record<string, string>) => {
        setValue(row);
        setOpenEdit(true);
    }

    const handleDelete = (rowId: string) => {
        console.log(rowId);
        setRowID(rowId);
        setOpenDelete(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleClickEditClose = () => {
        setOpenEdit(false);
    }

    const handleClickDeleteClose = () => {
        setOpenDelete(false);
    }

    const handleClickConfirm = async (updatedRow: Record<string, string>) => {
        console.log(updatedRow);
        await addItem(createActivityItem(updatedRow));
        setOpen(false);
    }

    const handleClickEditConfirm = async (updatedRow: Record<string, string>) => {
        console.log(updatedRow);
        await editItem(createActivityItem(updatedRow));
        setOpenEdit(false);
    }

    const handleClickDeleteConfirm = async (rowId: string) => {
        console.log(rowId);
        await deleteItem(rowId);
        setOpenDelete(false);
    }

    useEffect(() => {
        fetchItems<Activity[]>().then(result => {
            setRows(result.map(data => createRecord(data, uiHeaderNames)));
        });
    }, []);

  return (
    <>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Header title='Activities' sx={props.headerStyle}/>
            <AddButton onClick={handleAdd}/>
        </Box>
        <BasicTable
            headers={headers}
            rows={rows}
            isEditable={props.isEditable ?? false}
            isCollapsible={props.isCollapsible ?? false}
            onEditRow={handleEdit}
            onDeleteRow={handleDelete}
        />
        <ItemDialog
            open={open}
            title="Add a new Activity"
            value={value}
            onClose={handleClickClose}
            onConfirm={handleClickConfirm}
        />
        <ItemDialog
            open={openEdit}
            title="Edit an Activity"
            value={value}
            onClose={handleClickEditClose}
            onConfirm={handleClickEditConfirm}
        />
        <DeleteDialog 
            open={openDelete}
            rowId={rowID}
            onClose={handleClickDeleteClose}
            onDelete={handleClickDeleteConfirm}
        />
    </>  
  );
}