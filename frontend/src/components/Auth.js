import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export function Auth() {
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let response;
            if (mode === 'register') {
                response = await authAPI.register(form.name, form.email, form.password);
            } else {
                response = await authAPI.login(form.email, form.password);
            }

            login(response.data.user, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">TaskFlow</h1>
                <p className="auth-subtitle">
                    {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {mode === 'register' && (
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Aarav Patel"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={loading}
                    >
                        {loading
                            ? 'Please wait...'
                            : mode === 'login'
                                ? 'Login'
                                : 'Register'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {mode === 'login'
                            ? "Don't have an account? "
                            : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === 'login' ? 'register' : 'login');
                                setError('');
                            }}
                            className="link-button"
                        >
                            {mode === 'login' ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
