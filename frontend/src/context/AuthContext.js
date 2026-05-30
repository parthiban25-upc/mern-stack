import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('taskflow_token') || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('taskflow_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData, authToken) => {
        localStorage.setItem('taskflow_token', authToken);
        localStorage.setItem('taskflow_user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('taskflow_token');
        localStorage.removeItem('taskflow_user');
        setToken('');
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        setLoading,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
