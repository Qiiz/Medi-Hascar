import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import routes from './routes';

export default function App() {
  return (
    <>
      <Sidebar />
      <Router>
        <Routes>
          {routes.map(data => <Route key={data.route} path={data.route} element={data.page} />)}
        </Routes>
      </Router>
    </>
  );
}
