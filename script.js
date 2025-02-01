const scoreElement = document.getElementById("score");
const thinkingIndicator = document.getElementById("thinkingIndicator");
const quizContainer = document.getElementById("quizContainer");
const quizIntroduction = document.getElementById("quizIntroduction");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const startQuizButton = document.getElementById("startQuizButton");
const characterSelect = document.getElementById("characterSelect");
const customInput = document.getElementById("customCharacterInput");

let score = 0;
let hasIntroduced = false;
let previousAnswer = "";
let currentCharacter = "";
let askedQuestions = new Set();
let previousQuestion;

// Function to disable all inputs
function disableInputs() {
  document.querySelectorAll("input, select, button").forEach((element) => {
    element.disabled = true;
    element.classList.add("disabled-input");
  });
}

// Function to enable all inputs
function enableInputs() {
  document.querySelectorAll("input, select, button").forEach((element) => {
    element.disabled = false;
    element.classList.remove("disabled-input");
  });
}

// Initialize the character select dropdown using the characters array
characterSelect.addEventListener("change", () => {
  if (characterSelect.value === "custom") {
    customInput.style.display = "inline";
  } else {
    customInput.style.display = "none";
    hasIntroduced = false;
    previousAnswer = "";
    currentCharacter = characterSelect.value;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    askedQuestions.clear();
    generateQuiz(currentCharacter, previousAnswer, score, previousQuestion);
  }
});

customInput.addEventListener("blur", () => {
  if (customInput.value.trim() !== "") {
    const newOption = document.createElement("option");
    newOption.value = customInput.value;
    newOption.text = customInput.value;
    characterSelect.add(newOption);
    characterSelect.value = customInput.value;
    customInput.style.display = "none";
    customInput.value = "";
    hasIntroduced = false;
    previousAnswer = "";
    currentCharacter = characterSelect.value;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    askedQuestions.clear();
    generateQuiz(currentCharacter, previousAnswer, score, previousQuestion);
  }
});

// Function to generate a quiz question
const generateQuiz = async (
  character,
  previousAnswer,
  score,
  previousQuestion
) => {
  let request;

  // Check if the character has introduced themselves or not
  if (!hasIntroduced) {
    // If not, generate a request to introduce the character allong with the quiz question
    request = `You are ${character} from the The Legend of Heroes: Trails series made by Nihon Falcom. Introduce yourself in less than 100 characters and then host a quiz in character with a question and four possible answers. Indicate which answer is correct. Limit your self to only questions about the Trails series. And only ask questions that ${character} would know about.`;
  } else {
    //If the character has introduced themselves, generate a request to host a quiz question without introducing the character
    request = `You are ${character} from the The Legend of Heroes: Trails series made by Nihon Falcom. Host a quiz in character with a question and four possible answers. Indicate which answer is correct. Limit your self to only questions about the Trails series. And only ask questions that ${character} would know about. You asked the following questions allready ${[
      ...askedQuestions,
    ].join(", ")}.`;
    if (previousAnswer) {
      // If the player has answered a question bfore, generate a request to provide feedback based on the player's answer and score
      request += ` Comment on the player's performance based on their score and previous answer. Dot this in character. The previous answer was ${previousAnswer}. And the total score the player currently has is ${score}.The previous question was ${previousQuestion}. Do this in character too! Avoid reintroducing yourself!`;
    }
  }

  // Fetch a quiz question from the server/chatGPT API
  try {
    // Show thinking indicator and hide quiz container while fetching the question
    thinkingIndicator.style.display = "block";
    disableInputs();
    thinkingIndicator.innerText = `${character} is currently thinking of a new question....`; // Update thinking indicator text
    quizContainer.style.display = "none"; // Hide quiz container

    //Send a request to the server to generate a quiz question
    const response = await fetch(
      `https://didactic-trout-wgrvvqqpwj6c75w-3000.app.github.dev/quiz?request=${encodeURIComponent(
        request
      )}`
    );
    // Parse the JSON response and hide the thinking indicator
    const data = await response.json();
    thinkingIndicator.style.display = "none";
    enableInputs();

    // If the response is incomplete, generate a new question
    const { intro, question, correct, wrong1, wrong2, wrong3 } = data;

    if (!intro || !question || !correct || !wrong1 || !wrong2 || !wrong3) {
      generateQuiz(character, previousAnswer, score, previousQuestion);
      return;
    }

    // Check if the question has been asked before to avoid repetition. If so, generate a new question
    if (askedQuestions.has(question)) {
      generateQuiz(character, previousAnswer, score);
      return;
    }

    // Add the question to the set of asked questions
    askedQuestions.add(question);

    //Update the has introduced flag to avoid reintroducing the character when generating the next question
    if (!hasIntroduced) {
      hasIntroduced = true; // Update the flag here
    }
    quizIntroduction.innerText = intro;

    // Update the quiz question and answers in the UI
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

    // Create a button for each answer and add an event listener to handle the answer selection
    const answerLabels = ["A", "B", "C", "D"];
    answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerText = `${answerLabels[index]}: ${answer.text}`;
      button.addEventListener("click", async () => {
        previousQuestion = question;
        //update the score if the answer is correct and update the previous answer so that ai can give feedback
        if (answer.isCorrect) {
          score++;
          scoreElement.innerText = `Score: ${score}`;
          previousAnswer = "correct";
        } else {
          previousAnswer = "wrong";
        }

        // Generate a new quiz question after the player has answered the current question
        generateQuiz(character, previousAnswer, score, previousQuestion);
      });
      quizAnswers.appendChild(button);
    });

    quizContainer.style.display = "block";
  } catch (error) {
    thinkingIndicator.innerText = `We are trying to reach ${character} but we are having some trouble. Please try again later. Zemuria is a big place afterall perharps ${character} is busy right now.`;
    console.error("Error fetching quiz:", error);
    generateQuiz(character, previousAnswer, score, previousQuestion);
  }
};

// Event listener for the start quiz button
startQuizButton.addEventListener("click", () => {
  const character = characterSelect.value;
  if (character !== currentCharacter) {
    hasIntroduced = false;
    previousAnswer = "";
    currentCharacter = character;
    askedQuestions.clear();
  }
  //Quiz question generation request call
  generateQuiz(character, previousAnswer, score, previousQuestion);
});
