import { useState } from 'react';
import { 
    Box,
  } from '@mui/material';
import Header from './components/common/Header';
import AddButton from './components/common/AddButton';
import BasicTable from './components/common/BasicTable';
import ItemDialog from './components/common/ItemDialog';
import { pageStyle } from './styles';

const dataRows = [
    {
        'ID': 'tree',
        'Category': 'Medical',
        '1': 'Medical',
        '2': 'Medical',
        '3': 'Medical',
        '4': 'Medical',
        '5': 'Medical',
    },
    {
        'ID': 'daflkjgadjsglkjslkgjl',
        'Category': 'Medical',
        '1': 'Medical',
        '2': 'Medical',
        '3': 'Medical',
        '4': 'Medical',
        '5': 'Medical',
    }

]

const dataHeaders:string[] = [
    'ID',
    'S/N',
    'Name',
    'State',
    'Installation Date',
    'Status',
    'Functional',
    'Category',
    'Cost',
    'Under Warranty'
]

const defaultItem: Record<string, string> = {
    'S/N': 'goat',
    'Name': 'goat',
    'State': 'goat',
    'Installation Date': 'goat',
    'Status': 'goat',
    'Functional': 'goat',
    'Category': 'goat',
    'Cost': 'goat',
    'Under Warranty': 'goat',
};



export default function MedicalItems() {
    const [ open, setOpen ] = useState(false);
    const [ openDelete, setOpenDelete ] = useState(false);
    const [ rowID, setRowID ] = useState('');
    const [ value, setValue ] = useState<Record<string, string>>(defaultItem);

    const handleAdd = () => {
        setValue(defaultItem);
        setOpen(true);
    }

    const handleEdit = (row: Record<string, string>) => {
        setValue(row);
        setOpen(true);
    }

    const handleDelete = (rowId: string) => {
        console.log(rowId);
        setRowID(rowId);
        setOpenDelete(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleClickConfirm = (updatedRow: Record<string, string>) => {
        console.log(updatedRow);
        setOpen(false);
    }


  return (
    <Box sx={pageStyle}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Header title='Medical Items'/>
            <AddButton onClick={handleAdd}/>
        </Box>
        <BasicTable
            headers={dataHeaders}
            rows={dataRows}
            isEditable={true}
            isCollapsible={true}
            onEditRow={handleEdit}
            onDeleteRow={handleDelete}
        />
        <ItemDialog
            open={open}
            title="TITLE"
            value={value}
            onClose={handleClickClose}
            onConfirm={handleClickConfirm}
        />
    </Box>   
  );
}