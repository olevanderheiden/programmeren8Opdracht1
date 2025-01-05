import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

console.log("Environment Variables:");
console.log("AZURE_OPENAI_API_KEY:", process.env.AZURE_OPENAI_API_KEY);
console.log("AZURE_OPENAI_API_VERSION:", process.env.OPENAI_API_VERSION);
console.log(
  "AZURE_OPENAI_API_INSTANCE_NAME:",
  process.env.AZURE_OPENAI_API_INSTANCE_NAME
);
console.log(
  "AZURE_OPENAI_API_DEPLOYMENT_NAME:",
  process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
);

const model = new ChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
});
console.log("Model Details:", model);

app.get("/joke", async (req, res) => {
  const jokeRequest = req.query.request || "Tell me a Javascript joke!";
  try {
    const joke = await model.invoke(jokeRequest);
    res.json({ joke: joke.content });
  } catch (error) {
    console.log("modal content", model);
    console.error("Error invoking model:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
