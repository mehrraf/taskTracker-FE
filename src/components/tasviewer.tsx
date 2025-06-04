import React, { useEffect, useState } from "react";
import { ITask } from "../types/task";
import TaskList from "./taskslist";
import NewTaskForm from "./newTask";
import { fetchTasks } from "../helpers/fetchTasks";
import { addNewTask } from "../helpers/addNewTask";

const TaskViewer: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    getTasks();
  }, []);

  // Show the new task form
  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleSaveTask = async (task: ITask) => {
    try {
      const savedTask = await addNewTask(task);
      setTasks((prev) => [...prev, savedTask.data]);
    } catch (error) {
      console.error("Failed to add new task:", error);
    } finally {
      setShowForm(false);
    }
  };

  const handleTaskUpdated = (updatedTask: ITask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div>
      <div className="task-viewer-header">
        <h2>Task Viewer</h2>
        <button className="task-add" onClick={handleAddClick}>
          <img src="/plus.svg" alt="Add Task" className="plus-icon" />
        </button>
      </div>

      {showForm && (
        <NewTaskForm
          onSave={handleSaveTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && (
        <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} />
      )}
    </div>
  );
};

export default TaskViewer;
