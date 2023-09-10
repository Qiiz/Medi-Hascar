import { 
    Box,
  } from '@mui/material';
import TopBar from './components/TopBar';
import { pageStyle } from './styles';


export default function Main() {

  return (
    <Box sx={pageStyle}>
       <TopBar />
    </Box>  
  );
}