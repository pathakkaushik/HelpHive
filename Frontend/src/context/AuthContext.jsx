import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios'; // our configured axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This effect runs on initial app load to check if a user is already logged in
    useEffect(() => {
        const verifyUser = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                try {
                    // You could have an endpoint like /users/me to verify the token and get user data
                    // For now, we'll just parse the user from localStorage.
                    // A robust solution would re-fetch user data on refresh.
                    const storedUser = localStorage.getItem('user');
                    if(storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error("Session verification failed", error);
                    logout(); // Clear invalid data
                }
            }
            setLoading(false);
        };
        verifyUser();
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/users/login', { email, password });
        const { user: userData, accessToken } = response.data.data;
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', accessToken); // While cookies are httpOnly, storing this can be useful for auth headers if needed.
        
        setUser(userData);
        return userData;
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } catch(error) {
            console.error("Logout failed, clearing client-side data anyway.", error);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
        }
    };
    
    // You would add register functions here as well

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};