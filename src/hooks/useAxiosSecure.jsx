import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";

const axiosSecure = axios.create({
    baseURL: 'https://devdiary-server.vercel.app',
    withCredentials: true, // Add this to support cookies or sessions
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access-token');
                console.log("token", localStorage.getItem('access-token'));

            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    console.log("token", localStorage.getItem('access-token'));

    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/Account/SignIn'); // Assuming '/login' is your login route
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;