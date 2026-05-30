import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tasksAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import './Dashboard.css';

export function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await tasksAPI.getAll();
            setTasks(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
        }
    };

    const handleSaveTask = async (taskData, taskId) => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            if (taskId) {
                // Update task
                const response = await tasksAPI.update(taskId, taskData);
                setTasks((prev) =>
                    prev.map((task) => (task._id === taskId ? response.data : task))
                );
                setMessage('Task updated successfully!');
            } else {
                // Create task
                const response = await tasksAPI.create(taskData);
                setTasks((prev) => [response.data, ...prev]);
                setMessage('Task created successfully!');
            }
            setEditingTask(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        setError('');
        setMessage('');

        try {
            await tasksAPI.delete(taskId);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
            setMessage('Task deleted successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const stats = {
        total: tasks.length,
        active: tasks.filter((t) => t.status !== 'completed').length,
        completed: tasks.filter((t) => t.status === 'completed').length,
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>TaskFlow</h1>
                    <div className="header-actions">
                        <span className="user-info">👤 {user?.name}</span>
                        <button className="btn btn-secondary" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-card">
                        <h2>Welcome back, {user?.name}!</h2>
                        <p>Manage your tasks efficiently with our modern task manager.</p>
                        <div className="stats-grid">
                            <div className="stat">
                                <strong>{stats.total}</strong>
                                <span>Total Tasks</span>
                            </div>
                            <div className="stat">
                                <strong>{stats.active}</strong>
                                <span>In Progress</span>
                            </div>
                            <div className="stat">
                                <strong>{stats.completed}</strong>
                                <span>Completed</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Messages */}
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                {/* Content Layout */}
                <div className="content-layout">
                    {/* Task Form */}
                    <div className="form-section">
                        <TaskForm
                            task={editingTask}
                            onSave={handleSaveTask}
                            onCancel={() => setEditingTask(null)}
                            isLoading={loading}
                        />
                    </div>

                    {/* Task List */}
                    <div className="list-section">
                        <TaskList
                            tasks={tasks}
                            onEdit={setEditingTask}
                            onDelete={handleDeleteTask}
                            isLoading={loading}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
