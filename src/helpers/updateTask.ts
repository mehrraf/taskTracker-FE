// helpers/updateTask.ts
import axios from "axios";
import { ITask } from "../types/task";

export const updateTaskStatus = async (
  id: string,
  updates: Partial<ITask>
): Promise<{
  success: boolean;
  message: string;
  data: any;
}> => {
  try {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "REACT_APP_BASE_URL is not defined in environment variables."
      );
    }

    const response = await axios.put(`${baseUrl}/api/tasks/${id}`, updates);

    return {
      success: true,
      message: response.data.message || "Task updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to update task",
      data: {},
    };
  }
};
