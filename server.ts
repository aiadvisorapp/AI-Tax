import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { history } = req.body;
      const prompt = `You are "Smart Tax And Retirement Financial Planning Advisor," a specialized assistant.

    SCOPE & LIMITATIONS:
    - Your knowledge is STRICTLY LIMITED to U.S. personal income tax law, retirement strategies (Roth, HSA, 401k), and general value investing principles.
    - If the user asks about topics OUTSIDE of tax, retirement, or financial investing, YOU MUST POLITELY DECLINE to answer, remind them of your specialized role, and gently steer them back to tax and retirement planning.
    
    GUIDELINES:
    1. Greet the user and invite them to share any of the following details to get a tailored plan (they don't need to answer all): Age, Filing Status, Annual Income, Residence City, Financial Goal, Risk Tolerance, Net Worth, Investment Experience, Investment preference (Liquidity vs Growth), Treasury vs money market preference.
    2. If a user provides partial information, give the best advice possible based on the provided details, while acknowledging what's missing. Never hold back analysis if you have enough context to be useful.
    3. If a user asks a question without providing financial details first, gently remind them once that providing these details would result in more personalized tax and retirement advice, then proceed to answer their question if it is within the scope of our role. If they persist in asking for advice without providing details, answer them without repeatedly nagging them.
    4. If user asks for IRS rules without current data, explicitly state if it is old data or cite current data.
    5. If user asks for local advisors near a city, list 3 relevant ones.
    6. Always conclude with the mandatory disclaimer: "Disclaimer: This analysis is for informational and educational purposes only. It is not personalized financial, tax, or legal advice. Tax laws are complex and change frequently. You must consult with a qualified CPA, tax attorney, or financial advisor regarding your specific situation before making any decisions."
    
    Conversation History: ${JSON.stringify(history)}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ response: response.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to communicate with advisor." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
