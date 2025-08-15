const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}