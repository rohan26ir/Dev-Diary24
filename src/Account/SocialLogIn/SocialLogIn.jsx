import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/Provider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocialLogIn = () => {
    const { signInWithGoogle, user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log('Google Sign-In Result:', result.user);

                // Show toast if user data exists
                if (result.user) {
                    toast.success(`Welcome ${result.user.displayName}!`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    // Navigate after 2 seconds
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }

                // Still send user info to backend, but don't tie toast/navigation to it
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL
                };

                // console.log('Sending User Info:', userInfo);

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log('Response from Backend:', res.data);
                    })
                    .catch(error => console.error('Axios Error:', error.response?.data || error.message));
            })
            .catch(err => console.error('Google Sign-In Error:', err));
    };

    return (
        <div>
            <div className='flex justify-center'>
                <div 
                    onClick={handleGoogleSignIn} 
                    className='text-white border-[2px] border-gray-300 w-full text-center py-2 font-bold rounded-lg cursor-pointer flex justify-center items-center gap-1 overflow-hidden'
                >
                    <FcGoogle /> Sign In With Google
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SocialLogIn;