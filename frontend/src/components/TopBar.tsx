import React, { useEffect, useState } from 'react';
import { 
    Grid
} from '@mui/material';
import CardMUI from './Card';
import { mainCardStyle } from '../styles';
import { fetchStatistics } from '../api';
import { Statistics } from '../../../shared/models';

interface cardObject {
    title: string;
    stat: string;
  }

const cardTitles:cardObject[] = [
    { title: 'Overall Health', stat: '96%' },
    { title: 'Unhealthy', stat: '2' },
    { title: 'Available', stat: '200' },
    { title: 'Unavailable', stat: '15/02/23' }
];

export default function TopBar() {
  const [ value, setValue ] = useState<Statistics>();

  useEffect(() => {
    fetchStatistics().then(result => {
      setValue(result);
    });
  }, []);

  return (
    <Grid container sx={{backgroundColor: '#EFEFF0', p: 2, borderRadius: '10px', minWidth: '1000px'}} columns={4}>
        <Grid item xs={1}>
          <CardMUI title={'Overall Health'} stat={(value?.healthyPercentage ?? '0') + '%'} variant={mainCardStyle} />
        </Grid>
        <Grid item xs={1}>
          <CardMUI title={'Unhealthy'} stat={value?.totalUnhealthy ?? '0'} variant={mainCardStyle} />
        </Grid>
        <Grid item xs={1}>
          <CardMUI title={'Available'} stat={value?.totalAvailable ?? '0'} variant={mainCardStyle} />
        </Grid>
        <Grid item xs={1}>
          <CardMUI title={'Unavailable'} stat={value?.totalUnAvailable ?? '0'} variant={mainCardStyle} />
        </Grid>
    </Grid>
  );
}