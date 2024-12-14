const Chat = require('../models/Chat');

// @desc    Get all chats
// @route   GET /api/chats
// @access  Public
exports.getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({
      success: true,
      count: chats.length,
      data: chats
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single chat
// @route   GET /api/chats/:id
// @access  Public
exports.getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: chat
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new chat
// @route   POST /api/chats
// @access  Public
exports.createChat = async (req, res, next) => {
  try {
    const chat = await Chat.create(req.body);
    res.status(201).json({
      success: true,
      data: chat
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update chat
// @route   PUT /api/chats/:id
// @access  Public
exports.updateChat = async (req, res, next) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!chat) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: chat
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete chat
// @route   DELETE /api/chats/:id
// @access  Public
exports.deleteChat = async (req, res, next) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
