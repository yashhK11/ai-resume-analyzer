import express from "express";
import Groq from "groq-sdk";
import Analysis from "../models/Analysis.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze", authMiddleware, async (req, res) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ message: "Resume text is required" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Analyze this resume and return ONLY a valid JSON object with no extra text, no markdown, no backticks. The JSON must have these keys: score (number 0-100), strengths (array of strings), weaknesses (array of strings), missing_sections (array of strings), tips (array of strings).

Resume:
${resumeText}`,
        },
      ],
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    const analysis = await Analysis.create({
      userId: req.user.id,
      score: parsed.score,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      missing_sections: parsed.missing_sections,
      tips: parsed.tips,
    });

    res.status(200).json(analysis);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Analysis failed" });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(analyses);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch history" });
  }
});

export default router;
