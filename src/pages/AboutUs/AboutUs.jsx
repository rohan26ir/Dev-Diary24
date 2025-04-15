import React from 'react';
import TheTeam from './components/TheTeam';
import OurServices from './components/OurServices';
import ImagineIsReal from './components/ImagineIsReal';

const AboutUs = () => {
  return (
    <div className='w-11/12 mx-auto my-5 space-y-10'>
      <OurServices></OurServices>
      <TheTeam></TheTeam>
      <ImagineIsReal></ImagineIsReal>
    </div>
  );
};

export default AboutUs;