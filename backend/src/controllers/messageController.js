const getRandomQuote = require("../services/quotable");

const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;

  // Логіка авто-відповіді
  const botResponse = await getRandomQuote();

  res.json({
    success: true,
    data: {
      message: botResponse,
    },
  });
};

module.exports = { sendMessage };
