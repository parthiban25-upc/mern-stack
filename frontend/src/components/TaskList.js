import React from 'react';
import { TaskCard } from './TaskCard';
import './TaskList.css';

export function TaskList({ tasks, onEdit, onDelete, isLoading }) {
    if (tasks.length === 0) {
        return (
            <div className="task-list">
                <h2>Task Board</h2>
                <div className="empty-state">
                    <p>No tasks yet. Create your first task to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list">
            <h2>Task Board ({tasks.length})</h2>
            <div className="task-grid">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={() => onEdit(task)}
                        onDelete={() => onDelete(task._id)}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
}
