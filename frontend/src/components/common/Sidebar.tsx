import { MedicalServices } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import routes, { RouteData } from '../../routes';
import { sidebarStyle } from '../../styles';

export default function Sidebar() {
  return (
    <Drawer sx={sidebarStyle} variant="permanent" anchor="left" >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem' }}>
        <MedicalServices sx={{ width: '1.5rem', height: '1.5rem', mr: 2, color: '#3E6BF7' }}/>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          MedInventory
        </Typography>
      </Box>
      <Divider />
      <List>
        {routes.map((data: RouteData) => (
          <ListItem key={data.name} disablePadding>
            <ListItemButton href={data.route}>
              <ListItemIcon sx={{color: '#3E6BF7'}}>
                {data.icon}
              </ListItemIcon>
              <ListItemText primary={data.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};