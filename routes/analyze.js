const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
    try {
        const { resumeText } = req.body;
        if (!resumeText) return res.status(400).json({ error: "resumeText is required" });

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Analyze this resume and give a score out of 100 and improvement suggestions:\n${resumeText}`,
                },
            ],
            max_tokens: 800,
        });

        const result = response?.choices?.[0]?.message?.content || response?.choices?.[0]?.text || null;
        if (!result) return res.status(502).json({ error: "No response from AI" });

        res.json({ result });
    } catch (err) {
        console.error("/api/analyze error:", err);
        res.status(500).json({ error: "Failed to analyze resume" });
    }
});

module.exports = router;
