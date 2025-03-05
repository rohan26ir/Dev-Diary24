import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/Provider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogIn = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
          .then(result => {
            console.log('Google Sign-In Result:', result.user);
      
            const userInfo = {
              email: result.user?.email,
              name: result.user?.displayName,
              photoURL: result.user?.photoURL
            };
      
            console.log('Sending User Info:', userInfo); // 🔍 Log data before sending
      
            axiosPublic.post('/users', userInfo)
              .then(res => {
                console.log('Response from Backend:', res.data);
                navigate('/');
              })
              .catch(error => console.error('Axios Error:', error.response?.data || error.message));
          })
          .catch(err => console.error('Google Sign-In Error:', err));
      };
      


  return (
    <div>
      <div className='flex justify-center'>

        <div onClick={handleGoogleSignIn} className='border-2 border-gray-300 w-full text-center py-1 font-bold rounded-lg cursor-pointer  flex justify-center items-center gap-1  overflow-hidden'>
        <FcGoogle /> Sign In With Google
        
        </div>

      </div>
    </div>
  );
};

export default SocialLogIn;