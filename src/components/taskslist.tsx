import React from "react";
import { ITask } from "../types/task";
import { updateTaskStatus } from "../helpers/updateTask";

interface Props {
  tasks: ITask[];
  onTaskUpdated: (updatedTask: ITask) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onTaskUpdated }) => {
  const handleMarkAsDone = async (task: ITask) => {
    if (!task.id) {
      alert("Task ID is missing, cannot mark as done.");
      return;
    }
    const res = await updateTaskStatus(task.id, {
      ...task,
      status: task.status === "TODO" ? "IN_PROGRESS" : "DONE",
    });
    if (res.success) {
      const updatedTask: ITask = { ...task, status: res.data.status };
      onTaskUpdated(updatedTask);
    } else {
      alert(res.message);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks to show</p>
      </div>
    );
  }

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id || `task-${index}`}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
              {task.status === "TODO" && (
                <button
                  className=" btn done-btn"
                  onClick={() => handleMarkAsDone(task)}
                >
                  Start
                </button>
              )}

              {task.status === "IN_PROGRESS" && (
                <button
                  className="btn submit-btn"
                  onClick={() => handleMarkAsDone(task)}
                >
                  In progress
                </button>
              )}

              {task.status === "DONE" && (
                <button className="done-btn completed" disabled>
                  Completed
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
