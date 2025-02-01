import express from "express";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import dotenv from "dotenv";
import cors from "cors";

//Initialize dotenv to load environment variables
dotenv.config();

//Create server and set port
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

//Create a new instance of the ChatOpenAI class using the Azure OpenAI API
const model = new ChatTogetherAI({
  togetherAIApiKey: process.env.LANGSMITH_API_KEY,
  LANGSMITH_TRACING: process.env.LANGSMITH_TRACING,
  LANGSMITH_API_KEY: process.env.LANGSMITH_API_KEY,
  model: process.env.LANGSMITH_MODEL,
  temperature: process.env.LANGSMITH_TEMPERATURE,
  maxTokens: process.env.LANGSMITH_MAX_TOKENS,
});

//Define a route to generate a quiz question
app.get("/quiz", async (req, res) => {
  //Extract the request parameter from the query string
  const quizRequest = req.query.request;
  //Invoke the model to generate a quiz question based on the request
  try {
    const prompt = `${quizRequest} Please return the response in the following JSON format: {"intro": "character introduction or comment about the player's success during the quiz", "question": "question text", "correct": "correct answer", "wrong1": "wrong answer 1", "wrong2": "wrong answer 2", "wrong3": "wrong answer 3"}.`;
    const quiz = await model.invoke(prompt);

    //Parse the JSON response from the model
    const response = JSON.parse(quiz.content);

    //Return the response to the client
    res.json({
      intro: response.intro,
      question: response.question,
      correct: response.correct,
      wrong1: response.wrong1,
      wrong2: response.wrong2,
      wrong3: response.wrong3,
    });
  } catch (error) {
    //Handle any errors that occur during the model invocation
    console.error("Error invoking model:", error);
    res.status(500).json({ error: error.message });
  }
});

//Start the server and listen on the specified port for incoming requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
