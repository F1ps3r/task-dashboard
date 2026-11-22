import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TaskProvider, useTaskContext } from './TaskContext';

function BulkActionsHarness() {
  const { tasks, addTask, completeAllTasks, deleteCompletedTasks } = useTaskContext();

  return (
    <>
      <span data-testid="task-count">{tasks.length}</span>
      <span data-testid="completed-count">
        {tasks.filter(task => task.isCompleted).length}
      </span>
      <button onClick={() => addTask({ title: 'Test task', isCompleted: false, tags: [] })}>
        Add task
      </button>
      <button onClick={() => {
        if (tasks[0]) completeAllTasks([tasks[0].id]);
      }}>
        Complete selected
      </button>
      <button onClick={() => {
        if (tasks[0]) deleteCompletedTasks([tasks[0].id]);
      }}>
        Delete selected
      </button>
    </>
  );
}

describe('TaskContext bulk actions', () => {
  test('completes and deletes selected tasks', () => {
    render(
      <TaskProvider>
        <BulkActionsHarness />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText('Add task'));
    expect(screen.getByTestId('task-count').textContent).toBe('1');

    fireEvent.click(screen.getByText('Complete selected'));
    expect(screen.getByTestId('completed-count').textContent).toBe('1');

    fireEvent.click(screen.getByText('Delete selected'));
    expect(screen.getByTestId('task-count').textContent).toBe('0');
  });
});
