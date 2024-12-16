import axios from 'axios';

const API = axios.create({ baseURL: 'https://chat-app-reenbit-test.onrender.com/api' });

// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export const fetchChats = () => API.get('/chats');
export const createChat = (chatData) => API.post('/chats', chatData);
export const updateChat = (id, chatData) => API.put(`/chats/${id}`, chatData);
export const deleteChat = (id) => API.delete(`/chats/${id}`);
export const fetchMessages = (chatId) => API.get(`/messages/${chatId}`);
export const sendMessage = (chatId, text) => API.post(`/messages/${chatId}`, { text });
export const updateMessage = (messageId, newText) => API.put(`/messages/${messageId}`, { text: newText });
