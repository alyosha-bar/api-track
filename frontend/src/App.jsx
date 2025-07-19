import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>

      <Navbar/>
    

      <Routes>
        <Route path="/" element={<Landing/>}></Route>

        {/* protected  */}
        <Route path='/home' element={<> Home Page </>}></Route>


        {/* catch all */}
        <Route path='*' element={<> Not Found </>}></Route>

      </Routes>
    </>
  );
}