import { Article, BarChart, Home, People } from '@mui/icons-material';
import { ReactElement } from 'react';
import Activities from './Activities';
import Forecast from './Forecasts';
import Main from './Main';
import MedicalItems from './MedicalItems';
import Page from './Page';
import { headerStyle1 } from './styles';

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
    page: <Page><Main /></Page>
  },
  {
    route: '/medical-items',
    name: 'Medical Items',
    icon: <BarChart />,
    page: <Page><MedicalItems headerStyle={headerStyle1} isEditable isCollapsible /></Page>
  },
  {
    route: '/forecast',
    name: 'Forecast',
    icon: <Article />,
    page: <Page><Forecast headerStyle={headerStyle1} /></Page>
  },
  {
    route: '/activities',
    name: 'Activities',
    icon: <People />,
    page: <Page><Activities headerStyle={headerStyle1} isEditable /></Page>
  },
]

export default routes;
