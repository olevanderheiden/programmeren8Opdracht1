const scoreElement = document.getElementById("score");
const thinkingIndicator = document.getElementById("thinkingIndicator");
const quizContainer = document.getElementById("quizContainer");
const quizIntroduction = document.getElementById("quizIntroduction");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const startQuizButton = document.getElementById("startQuizButton");
const characterSelect = document.getElementById("characterSelect");

let score = 0;
let hasIntroduced = false;
let previousAnswer = "";
let currentCharacter = "";
let askedQuestions = new Set();
let previousQuestion;

characterSelect.addEventListener("change", () => {
  hasIntroduced = false;
  previousAnswer = "";
  currentCharacter = characterSelect.value;
  score = 0;
  scoreElement.innerText = `Score: ${score}`;
  askedQuestions.clear();
  generateQuiz(currentCharacter, previousAnswer, score, previousQuestion);
});

const generateQuiz = async (
  character,
  previousAnswer,
  score,
  previousQuestion
) => {
  let request;

  if (!hasIntroduced) {
    request = `You are ${character} from the The Legend of Heroes: Trails series made by Nihon Falcom. Introduce yourself in less than 100 characters and then host a quiz in character with a question and four possible answers. Indicate which answer is correct. Limit your self to only questions about the Trails series. And only ask questions that ${character} would know about.`;
  } else {
    request = `You are ${character} from the The Legend of Heroes: Trails series made by Nihon Falcom. Host a quiz in character with a question and four possible answers. Indicate which answer is correct. Limit your self to only questions about the Trails series. And only ask questions that ${character} would know about.`;
    if (previousAnswer) {
      console.log("Previous answer:", previousAnswer);
      request += ` Comment on the player's performance based on their score and previous answer. Dot this in character. The previous answer was ${previousAnswer}. And the total score the player currently has is ${score}. The previous question was ${previousQuestion}. Do this in character too! Avoid reintroducing yourself!`;
    }
  }

  try {
    thinkingIndicator.style.display = "block"; // Show thinking indicator
    thinkingIndicator.innerText = `${character} is currently thinking of a new question....`; // Update thinking indicator text
    quizContainer.style.display = "none"; // Hide quiz container

    const response = await fetch(
      `http://localhost:3000/quiz?request=${encodeURIComponent(request)}`
    );
    const data = await response.json();
    thinkingIndicator.style.display = "none"; // Hide thinking indicator

    const { intro, question, correct, wrong1, wrong2, wrong3 } = data;

    if (!intro || !question || !correct || !wrong1 || !wrong2 || !wrong3) {
      console.error("Incomplete data received, generating a new question...");
      generateQuiz(character, previousAnswer, score, previousQuestion);
      return;
    }

    if (askedQuestions.has(question)) {
      console.log("Repeated question received, generating a new question...");
      generateQuiz(character, previousAnswer, score);
      return;
    }

    askedQuestions.add(question);

    if (!hasIntroduced) {
      quizIntroduction.innerText = intro;
      hasIntroduced = true; // Update the flag here
    } else {
      quizIntroduction.innerText = intro;
    }

    quizQuestion.innerText = `Question: ${question}`;
    quizAnswers.innerHTML = "";

    const answers = [
      { text: correct, isCorrect: true },
      { text: wrong1, isCorrect: false },
      { text: wrong2, isCorrect: false },
      { text: wrong3, isCorrect: false },
    ];

    // Shuffle answers to randomize their order
    answers.sort(() => Math.random() - 0.5);

    const answerLabels = ["A", "B", "C", "D"];
    answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerText = `${answerLabels[index]}: ${answer.text}`;
      button.addEventListener("click", async () => {
        previousQuestion = question;
        if (answer.isCorrect) {
          score++;
          scoreElement.innerText = `Score: ${score}`;
          previousAnswer = "correct";
        } else {
          previousAnswer = "wrong";
        }

        // Log the current state for debugging
        console.log("Current score:", score);
        console.log("Previous answer:", previousAnswer);

        // Generate the next question with feedback
        generateQuiz(character, previousAnswer, score, previousQuestion);
      });
      quizAnswers.appendChild(button);
    });

    quizContainer.style.display = "block"; // Show quiz container
  } catch (error) {
    console.error("Error fetching quiz:", error);
    generateQuiz(character, previousAnswer, score, previousQuestion);
  }
};

startQuizButton.addEventListener("click", () => {
  const character = characterSelect.value;
  if (character !== currentCharacter) {
    hasIntroduced = false;
    previousAnswer = "";
    currentCharacter = character;
    askedQuestions.clear();
  }
  generateQuiz(character, previousAnswer, score, previousQuestion);
});
