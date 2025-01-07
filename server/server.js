import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const model = new ChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAIA_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAIA_API_DEPLOYMENT_NAME,
});

app.get("/quiz", async (req, res) => {
  const quizRequest =
    req.query.request ||
    "Introduce yourself and host a quiz with a question and four possible answers. Indicate which answer is correct.";
  try {
    const prompt = `${quizRequest} Please return the response in the following JSON format: {"intro": "character introduction or comment about the player's success during the quiz", "question": "question text", "correct": "correct answer", "wrong1": "wrong answer 1", "wrong2": "wrong answer 2", "wrong3": "wrong answer 3"}.`;
    const quiz = await model.invoke(prompt);
    console.log("Quiz:", quiz);

    const response = JSON.parse(quiz.content);

    res.json({
      intro: response.intro,
      question: response.question,
      correct: response.correct,
      wrong1: response.wrong1,
      wrong2: response.wrong2,
      wrong3: response.wrong3,
    });
  } catch (error) {
    console.error("Error invoking model:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
