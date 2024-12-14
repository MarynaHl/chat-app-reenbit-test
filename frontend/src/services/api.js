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

export const loginWithEmailAndPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in with email and password", error);
    return { success: false };
  }
};

export const sendMessageToChat = async (chatId, message) => {
  try {
    const response = await axios.post(`${API_URL}/chats/${chatId}/messages`, { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message", error);
    return { success: false };
  }
};

export const updateMessage = async (messageId, newText) => {
  try {
    const response = await axios.put(`${API_URL}/messages/${messageId}`, { text: newText });
    return response.data;
  } catch (error) {
    console.error("Error updating message", error);
    return { success: false };
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    return { success: false, message: "Registration failed" };
  }
};

