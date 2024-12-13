import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginWithTestAccount = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/test-login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    return { success: false };
  }
};
