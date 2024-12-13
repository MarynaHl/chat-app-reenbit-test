import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const sendMessageToChat = async (chatId, message) => {
  try {
    const response = await axios.post(`${API_URL}/chats/${chatId}/messages`, { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message", error);
    return { success: false };
  }
};
