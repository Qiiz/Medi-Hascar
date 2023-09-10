import { Box, SxProps } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MedicalItem } from '../../shared/models';
import { addItem, createRecord, deleteItem, editItem, fetchMedicalItems } from './api';
import DeleteDialog from './components/DeleteDialog';
import AddButton from './components/common/AddButton';
import BasicTable from './components/common/BasicTable';
import Header from './components/common/Header';
import ItemDialog from './components/common/ItemDialog';

const visibleHeaders = [
    'S/N',
    'Name',
    'State',
    'Installation Date',
    'Status',
    'Functional'
]

const uiHeaderNames: Record<keyof MedicalItem, string> = {
    serial_number: 'S/N',
    equip_name: 'Name',
    state: 'State',
    installation_date: 'Installation Date',
    status: 'Status',
    functionality:'Functional',
    category: 'Category',
    cost: 'Cost',
    under_warrenty: 'Under Warranty'
}

const defaultItem: MedicalItem = {
    serial_number: '',
    equip_name: '',
    state: '',
    installation_date: '',
    status: '',
    functionality:'',
    category: '',
    cost: 0,
    under_warrenty: false
};

export function createMedicalItem(data: Record<string, string>): MedicalItem {
    const result: MedicalItem = {
        serial_number: data['S/N'] ?? '',
        equip_name: data['Name'] ?? '',
        state: data['State'] ?? '',
        installation_date: data['Installation Date'] ?? '',
        status: data['Status'] ?? '',
        functionality: data['Functional'] ?? '',
        category: data['Category'] ?? '',
        cost: parseInt(data['Cost'], 0),
        under_warrenty: data['Under Warranty'] === 'true',
    }
    return result;
}

export interface MedicalItemsProps {
    headerStyle: SxProps,
    isEditable?: boolean,
    isCollapsible?: boolean
}

export default function MedicalItems(props: MedicalItemsProps) {
    const [ loaded, setLoaded ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);
    const [ rows, setRows ] = useState<Record<string, string>[]>([]);
    const [ rowID, setRowID ] = useState('');
    const [ value, setValue ] = useState<Record<string, string>>(createRecord(defaultItem, uiHeaderNames));

    const handleAdd = useCallback(() => {
        setValue(createRecord(defaultItem, uiHeaderNames));
        setOpen(true);
    }, []);

    const handleEdit = useMemo(() => (row: Record<string, string>) => {
        setValue(row);
        setOpenEdit(true);
    }, []);

    const handleDelete = useMemo(() => (rowId: string) => {
        console.log(rowId);
        setRowID(rowId);
        setOpenDelete(true);
    }, []);

    const handleClickClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleClickEditClose = useCallback(() => {
        setOpenEdit(false);
    }, []);

    const handleClickDeleteClose = useCallback(() => {
        setOpenDelete(false);
    }, []);

    const handleClickConfirm = useMemo(() => async (updatedRow: Record<string, string>) => {
        console.log(updatedRow);
        await addItem(createMedicalItem(updatedRow));
        setOpen(false);
        setLoaded(false);
    }, [])

    const handleClickEditConfirm = useMemo(() => async (updatedRow: Record<string, string>) => {
        console.log(updatedRow);
        await editItem(createMedicalItem(updatedRow));
        setOpenEdit(false);
        setLoaded(false);
    }, [])

    const handleClickDeleteConfirm = useMemo(() => async (rowId: string) =>  {
        console.log(rowId);
        await deleteItem(rowId);
        setOpenDelete(false);
        setLoaded(false);
    }, [])

    useEffect(() => {
        if (!loaded) {
            fetchMedicalItems().then(result => {
                setRows(result.map(data => createRecord(data, uiHeaderNames)));
            });
            setLoaded(true);
        }
    }, [loaded]);

  return (
    <>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Header title='Medical Items' sx={props.headerStyle}/>
            {props.isEditable && <AddButton onClick={handleAdd}/>}
        </Box>
        <BasicTable
            headers={visibleHeaders}
            rows={rows}
            isEditable={props.isEditable ?? false}
            isCollapsible={props.isCollapsible ?? false}
            onEditRow={handleEdit}
            onDeleteRow={handleDelete}
        />
        <ItemDialog
            open={open}
            title="Add a new Medical Item"
            value={value}
            onClose={handleClickClose}
            onConfirm={handleClickConfirm}
        />
        <ItemDialog
            open={openEdit}
            title="Edit a Medical Item"
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
