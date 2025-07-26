import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import RequireAuth from './components/auth/RedirectToLanding';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Settings from './pages/Settings';

export default function App() {
  return (
    <>

      <Navbar/>
    

      <Routes>
        <Route path="/" element={<Landing/>}></Route>

        <Route path='/docs' element={<Docs/>}></Route>

        {/* protected  */}
        <Route path='/home' element={
          <>
            <RequireAuth>
              <Home/>
            </RequireAuth>
          </>
        }></Route>

        {/* protected  */}
        <Route path='/dashboard/:id' element={
          <>
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          </>
        }></Route>

        {/* protected  */}
        <Route path='/settings/:id' element={
          <>
            <RequireAuth>
              <Settings />
            </RequireAuth>
          </>
        }></Route>


        {/* catch all */}
        <Route path='*' element={<> Not Found </>}></Route>

      </Routes>
    </>
  );
}