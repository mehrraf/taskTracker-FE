import React from "react";
import { ITask } from "../types/task";

interface Props {
  task: ITask;
}

const TaskItem: React.FC<Props> = ({ task }) => (
  <div
    style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
  >
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Status: {task.status}</p>
  </div>
);

export default TaskItem;
