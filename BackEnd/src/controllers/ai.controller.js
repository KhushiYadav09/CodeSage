const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code || !code.trim()) {
    return res.status(400).send("Code is required");
  }

  try {
    const response = await aiService(code);
    res.send(response);
  } catch (err) {
    console.error("Review failed:", err.message);
    res
      .status(500)
      .send("Something went wrong while reviewing your code. Please try again.");
  }
};
