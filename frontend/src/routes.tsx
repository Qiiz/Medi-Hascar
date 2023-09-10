import { Article, BarChart, Home, People } from '@mui/icons-material';
import { ReactElement } from 'react';
import Activities from './Activities';
import Forecast from './Forecast';
import Main from './Main';
import MedicalItems from './MedicalItems';

export interface RouteData {
  route: string,
  name: string,
  icon: ReactElement,
  page: ReactElement,
}

const routes: RouteData[] = [
  {
    route: '/',
    name: 'Home',
    icon: <Home />,
    page: <Main />
  },
  {
    route: '/medical-items',
    name: 'Medical Items',
    icon: <BarChart />,
    page: <MedicalItems />
  },
  {
    route: '/forecast',
    name: 'Forecast',
    icon: <Article />,
    page: <Forecast />
  },
  {
    route: '/activities',
    name: 'Activities',
    icon: <People />,
    page: <Activities />
  },
]

export default routes;
