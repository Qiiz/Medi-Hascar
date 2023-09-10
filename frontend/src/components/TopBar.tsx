import React from 'react';
import { 
    Grid
} from '@mui/material';
import CardMUI from './Card';
import { mainCardStyle } from '../styles';

interface cardObject {
    title: string;
    stat: string;
  }

const cardTitles:cardObject[] = [
    { title: 'Overall Health', stat: '96%' },
    { title: 'Unhealthy', stat: '2' },
    { title: 'Available', stat: '200' },
    { title: 'Next Maintenance', stat: '15/02/23' }
];

export default function TopBar() {
  return (
    <Grid container sx={{backgroundColor: '#EFEFF0', p: 2, borderRadius: '10px', minWidth: '1000px'}} columns={4}>
        {cardTitles.map((data:cardObject) => (
            <Grid item key={data.title} xs={1}>
                <CardMUI title={data.title} stat={data.stat} variant={mainCardStyle} />
            </Grid>
        ))}
    </Grid>
  );
}