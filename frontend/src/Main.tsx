import Forecasts from './Forecasts';
import MedicalItems from './MedicalItems';
import TopBar from './components/TopBar';
import { headerStyle2 } from './styles';

export default function Main() {

  return (
    <>
       <TopBar />
       <MedicalItems headerStyle={headerStyle2}/>
       <Forecasts headerStyle={headerStyle2}/>
    </>  
  );
}
