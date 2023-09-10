import { SxProps } from '@mui/material';

const sidebarWidth = '240px';

export const sidebarStyle: SxProps = {
  width: sidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: sidebarWidth,
    boxSizing: 'border-box',
  },
}

export const pageStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: sidebarWidth,
  padding: '8px 10px'
};


export const mainCardStyle = {
    card: {
        width: 'auto',
        margin: '0px 8px',
        borderRadius: '5px',
    },
    font1: {
        fontSize: 16, 
        fontWeight: 500, 
        color:'#3E6BF7',
    },
    font2: {
        fontSize: 36, 
        fontWeight: 700, 
        textAlign: 'center', 
        m: 2,
    }
}

export const tableCardStyle = {
    card: {
        width: 'auto',
        display: 'inline-block',
        border: '0px'
    },
    font1: {
        fontSize: 10, 
        fontWeight: 100, 
    },
    font2: {
        fontSize: 14
    }
}

export const headerStyle1 = { fontSize: 36, fontWeight: 550, color:'#3E6BF7'}
export const headerStyle2 = { fontSize: 18, fontWeight: 500, color:'#3E6BF7', marginTop: '20px'}