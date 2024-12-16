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

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/chats', require('./routes/chatRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const seedChats = async () => {
    const initialChats = [
        { firstName: 'Alice', lastName: 'Freeman', avatar: '/images/avatar1.png' },
        { firstName: 'Josefina', lastName: 'Walker', avatar: '/images/avatar2.png' },
        { firstName: 'Velazquez', lastName: 'Piter', avatar: '/images/avatar3.png' },
    ];

    try {
        await Chat.deleteMany({});
        console.log('Existing chats removed.');
        await Chat.insertMany(initialChats);
        console.log('Chats seeded successfully.');
    } catch (err) {
        console.error('Error seeding chats:', err.message);
    }
};

app.post('/api/seed-chats', async (req, res) => {
    try {
        await seedChats();
        res.status(200).json({ message: 'Chats seeded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
