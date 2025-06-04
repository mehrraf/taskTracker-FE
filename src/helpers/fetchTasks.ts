import axios from "axios";
import { ITask } from "../types/task";
import { apiRoutes } from "../utils/api.route";

export const fetchTasks = async (): Promise<Array<ITask>> => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log("Base URL:", baseUrl);

  try {
    if (!baseUrl) {
      throw new Error(
        "REACT_APP_BASE_URL is not defined in environment variables."
      );
    }

    const response = await axios.get(
      `${baseUrl}${apiRoutes.api}${apiRoutes.fetch}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response received:", response.data);
    return response.data as Array<ITask>;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};
