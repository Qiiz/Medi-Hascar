import { 
    Box,
  } from '@mui/material';
import Header from './components/common/Header';
import { pageStyle } from './styles';


export default function Main() {

  return (
    <Box sx={pageStyle}>
        <Header title='Main'/>
    </Box>  
  );
}