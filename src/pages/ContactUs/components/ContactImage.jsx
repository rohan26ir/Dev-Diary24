import React from 'react';

import contactImage from '../../../assets/Lotttie/Animation - contact us.json'
import Lottie from 'lottie-react';

const ContactImage = () => {
  return (
    <div>
      
      <div>
        <Lottie animationData={contactImage} loop={true} autoplay={true} className='h-full w-full' />
      </div>

    </div>
  );
};

export default ContactImage;