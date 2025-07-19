import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return ( 
        <nav className='bg-blue-300 py-6 px-6'>
        <div className='container mx-auto flex justify-between items-center'>
          {/* Logo */}
          <div class="flex items-center space-x-2">
            <img src="/logo.png" alt="API-Track Logo" className="h-8 w-8" />
            <h2 class="text-2xl font-bold text-gray-800">
              <Link to="/">API-Track</Link>
            </h2>
          </div>
          {/* Navigation Links */}
          <div className='space-x-6 flex items-center'>
            <SignedIn>
              <div className='flex items-center space-x-4'>
                <Link
                  to='/home'
                  className='text-black hover:text-blue-500 font-medium'
                >
                  Home
                </Link>
                <UserButton/>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton/>
            </SignedOut>
          </div>
        </div>
      </nav>
     );
}
 
export default Navbar;