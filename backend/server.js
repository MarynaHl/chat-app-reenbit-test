const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { getRandomQuote } = require('./utils/quotable');
const Chat = require('./models/Chat');
const Message = require('./models/Message');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/chats', require('./routes/chatRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const seedChats = async () => {
    const initialChats = [
        { firstName: 'Alice', lastName: 'Freeman', avatar: '/images/avatar1.png' },
        { firstName: 'Josefina', lastName: 'Walker', avatar: '/images/avatar2.png' },
        { firstName: 'Velazquez', lastName: 'Piter', avatar: '/images/avatar3.png' },
    ];

    for (let chat of initialChats) {
        const exists = await Chat.findOne({ firstName: chat.firstName, lastName: chat.lastName });
        if (!exists) {
            await Chat.create(chat);
        }
    }
};

seedChats();
