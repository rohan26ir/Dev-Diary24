import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";

const axiosSecure = axios.create({
    baseURL: 'https://devdiary-server.vercel.app',
    withCredentials: true,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access-token');
            // console.log("Token found:", !!token); // Better logging
            
            if (token) {
                // Use capitalized Authorization header
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            console.error("Axios response error:", error.response?.status, error.message);
            
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                // console.log("Authentication failed, logging out...");
                await logOut();
                navigate('/Account/SignIn');
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;