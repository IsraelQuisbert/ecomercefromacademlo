import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Purchases from './pages/Purchases';
import LoadingScreen from './components/LoadingScreen';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  const isLoading = useSelector(state => state.loading)

  return (
    <div className="App vw vh">
      <HashRouter>
        <NavBar/>
          { isLoading && <LoadingScreen />}
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products/:id' element={<Products/>} />
              <Route path='/login' element={<Login/>} />

              <Route element={<ProtectedRoutes />}>
                <Route path='/purchases' element={<Purchases/>} />
              </Route>
          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

