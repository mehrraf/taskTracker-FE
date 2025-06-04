import React, { useState } from "react";
import { ITask } from "../types/task";

interface Props {
  onSave: (task: ITask) => void;
  onCancel: () => void;
}

const NewTaskForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: ITask = {
      title,
      description,
      status: "TODO",
    };

    onSave(newTask);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3 className="form-title">Create New Task</h3>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn submit-btn">
          Save Task
        </button>
      </div>
    </form>
  );
};

export default NewTaskForm;
