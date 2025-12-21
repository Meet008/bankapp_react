import axios from "axios";
import { ENDPOINT } from "../config/config";

export const AxiosClient = async (
  url,
  method = "get",
  data = null,
  withBearer = false,
  headers_ = {},
  token
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...headers_,
    };

    if (withBearer) {
      const authToken = token || localStorage.getItem("token");
      if (!authToken) {
        localStorage.clear();
        window.location.assign("/login");
        return;
      }
      headers.Authorization = `Bearer ${authToken}`;
    }

    const response = await axios({
      method,
      url: `${ENDPOINT}${url}`,
      data,
      headers,
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
