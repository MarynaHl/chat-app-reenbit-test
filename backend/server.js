const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Chat = require('./models/Chat');
const Message = require('./models/Message');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Обслуговування статичних файлів із папки public
app.use(express.static('public'));

// Підключення до MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/chats', require('./routes/chatRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Seed Chats (початкові дані)
const seedChats = async () => {
    const initialChats = [
        { firstName: 'Alice', lastName: 'Freeman', avatar: '/images/avatar1.png' },
        { firstName: 'Josefina', lastName: 'Walker', avatar: '/images/avatar2.png' },
        { firstName: 'Velazquez', lastName: 'Piter', avatar: '/images/avatar3.png' },
    ];

    try {
        await Chat.deleteMany({}); // Очистка колекції перед вставкою
        console.log('Existing chats removed.');

        await Chat.insertMany(initialChats); // Вставка нових чатів
        console.log('Chats seeded successfully.');
    } catch (err) {
        console.error('Error seeding chats:', err.message);
    }
};

// Виклик функції seedChats
seedChats();
