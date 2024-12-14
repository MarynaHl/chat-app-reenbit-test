import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchChats = () => API.get('/chats');
export const createChat = (chatData) => API.post('/chats', chatData);
export const updateChat = (id, chatData) => API.put(`/chats/${id}`, chatData);
export const deleteChat = (id) => API.delete(`/chats/${id}`);
export const fetchMessages = (chatId) => API.get(`/messages/${chatId}`);
export const sendMessage = (chatId, text) => API.post(`/messages/${chatId}`, { text });
