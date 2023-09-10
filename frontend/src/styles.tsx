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