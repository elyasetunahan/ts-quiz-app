import { useState } from "react";
//Components
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions } from "./API";
// Types
import { QuestionState, Difficulty } from "./API";

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz with TS</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}

      {!gameOver ? <div className="score">Score:</div> : null}
      {loading ? <p>Loading</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="nextQuestion" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
