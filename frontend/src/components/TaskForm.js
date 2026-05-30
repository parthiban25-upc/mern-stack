import React, { useState, useEffect } from 'react';
import './TaskForm.css';

export function TaskForm({ task, onSave, onCancel, isLoading }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate
                    ? new Date(task.dueDate).toISOString().split('T')[0]
                    : '',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError('Title is required');
            return;
        }
        onSave(form, task?._id);
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Task title"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Add details..."
                    rows="4"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                    id="dueDate"
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                />
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : task ? 'Update Task' : 'Add Task'}
                </button>
                {task && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
