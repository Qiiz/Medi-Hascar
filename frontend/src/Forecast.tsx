import { 
    Box,
  } from '@mui/material';
import Header from './components/common/Header';
import BasicTable from './components/common/BasicTable';
import { pageStyle } from './styles';

const dataRows = [
  {
      'Category': 'Medical',
      '1': 'Medical',
      '2': 'Medical',
      '3': 'Medical',
      '4': 'Medical',
      '5': 'Medical',
  }

]

const dataHeaders = [
  'Category',
  'Quantity',
  'In Use',
  'Available',
  'Unhealthy',
  'Forecast'
]

export default function Forecast() {

  return (
    <Box sx={pageStyle}>
        <Header title='Forecast'/>
        <BasicTable
            headers={dataHeaders}
            rows={dataRows}
            isEditable={false}
            isCollapsible={false}
        />
    </Box>  
  );
}