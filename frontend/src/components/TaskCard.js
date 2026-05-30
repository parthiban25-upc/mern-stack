import React from 'react';
import './TaskCard.css';

export function TaskCard({ task, onEdit, onDelete, isLoading }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: '#fbbf24',
            'in-progress': '#60a5fa',
            completed: '#10b981',
        };
        return colors[status] || '#6b7280';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: '#10b981',
            medium: '#f59e0b',
            high: '#ef4444',
        };
        return colors[priority] || '#6b7280';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <article className="task-card">
            <div className="task-header">
                <div className="task-title-section">
                    <h3>{task.title}</h3>
                    <p className="task-description">
                        {task.description || 'No description'}
                    </p>
                </div>
                <div className="task-actions">
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={onEdit}
                        disabled={isLoading}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={onDelete}
                        disabled={isLoading}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="task-badges">
                <span
                    className="badge"
                    style={{ backgroundColor: `${getStatusColor(task.status)}20` }}
                >
                    <span style={{ color: getStatusColor(task.status) }}>
                        ● {task.status}
                    </span>
                </span>
                <span
                    className="badge"
                    style={{ backgroundColor: `${getPriorityColor(task.priority)}20` }}
                >
                    <span style={{ color: getPriorityColor(task.priority) }}>
                        ● {task.priority}
                    </span>
                </span>
                <span className="badge" style={{ color: 'var(--muted)' }}>
                    📅 {formatDate(task.dueDate)}
                </span>
            </div>
        </article>
    );
}
