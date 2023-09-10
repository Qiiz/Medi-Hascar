import { useState, useEffect } from 'react';
import { 
    Box, SxProps,
  } from '@mui/material';
import Header from './components/common/Header';
import BasicTable from './components/common/BasicTable';
import { fetchForecast, createRecord } from './api';
import { Forecast } from '../../shared/models';


const headers = [
  'Category',
  'Quantity',
  'In Use',
  'Available',
  'Unhealthy',
  'Forecast'
]

const uiHeaderNames: Record<keyof Forecast, string> = {
  category: '', // Primary key
  quantity: '',
  in_use: '',
  available: '',
  unhealthy: '',
  forecast: ''
}

export interface ForecastsProps {
  headerStyle: SxProps,
  isEditable?: boolean,
  isCollapsible?: boolean
}

export default function Forecasts(props: ForecastsProps) {
  const [ rows, setRows ] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    fetchForecast().then(result => {
        setRows(result.map(data => createRecord(data, uiHeaderNames)));
    });
}, []);

  return (
    <>
        <Header title='Forecast' sx={props.headerStyle}/>
        <BasicTable
            headers={headers}
            rows={rows}
            isEditable={props.isEditable ?? false}
            isCollapsible={props.isCollapsible ?? false}
        />
    </>  
  );
}