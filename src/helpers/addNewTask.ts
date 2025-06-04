import axios from "axios";

interface TaskPayload {
  title: string;
  description: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
}

interface AddTaskResponse {
  success: boolean;
  message: string;
  data: any;
}

export const addNewTask = async (
  task: TaskPayload
): Promise<AddTaskResponse> => {
  try {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    if (!baseUrl) {
      throw new Error(
        "REACT_APP_BASE_URL is not defined in environment variables."
      );
    }

    const response = await axios.post(`${baseUrl}/api/tasks`, task);

    return {
      success: true,
      message: response.data.message || "Task added successfully",
      data: response.data,
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    return {
      success: false,
      message,
      data: {},
    };
  }
};
