import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const MainLayout = () => {
  return (
    <div className='bg-black text-white '>
      <header className='sticky top-0 z-50 bg-black/60 backdrop-blur-md'>
        <Navbar></Navbar>
      </header>

      <main className='min-h-40 '>
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;