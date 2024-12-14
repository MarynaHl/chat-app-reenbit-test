import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chats';

export const createChat = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to create chat:', error);
  }
};

export const sendMessage = async (chatId, message) => {
  try {
    const response = await axios.post(`${API_URL}/${chatId}/messages`, { text: message });
    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
