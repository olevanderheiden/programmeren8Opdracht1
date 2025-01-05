document.addEventListener("DOMContentLoaded", () => {
  const characterSelect = document.getElementById("characterSelect");
  const startQuizButton = document.getElementById("startQuizButton");
  const quizContainer = document.getElementById("quizContainer");
  const quizIntroduction = document.getElementById("quizIntroduction");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizAnswers = document.getElementById("quizAnswers");
  const scoreElement = document.getElementById("score");
  let score = 0;

  startQuizButton.addEventListener("click", async () => {
    const character = characterSelect.value;
    const request = `You are ${character} from the The Legend of Heroes: Trails series made by Nihon Falcom. Introduce yourself and then host a quiz in character with a question and four possible answers. Indicate which answer is correct.`;

    try {
      const response = await fetch(
        `http://localhost:3000/quiz?request=${encodeURIComponent(request)}`
      );
      const data = await response.json();
      const { intro, question, correct, wrong1, wrong2, wrong3 } = data;

      quizIntroduction.innerText = intro;
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
        button.addEventListener("click", () => {
          if (answer.isCorrect) {
            score++;
            scoreElement.innerText = `Score: ${score}`;
            alert(`${character} says: Correct!`);
          } else {
            alert(
              `${character} says: Wrong! The correct answer was: ${correct}`
            );
          }
          startQuizButton.click(); // Load next question
        });
        quizAnswers.appendChild(button);
      });

      quizContainer.style.display = "block";
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  });
});
