import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const MainLayout = () => {
  return (
    <div className='bg-black text-white'>

      <div className='mx-auto'>
      <header className='sticky top-0 z-40 bg-black/60 backdrop-blur-md'>
        <Navbar></Navbar>
      </header>

      <main className='min-h-screen'>
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
      </div>
      
    </div>
  );
};

export default MainLayout;