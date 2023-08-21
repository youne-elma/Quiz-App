import { useData } from "../../context/useDataContext";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function Game() {
  const { questions } = useData();

  return (
    <div>
      {questions.map((question: Question) => (
        <li key={question.question}>{question.question}</li>
      ))}
    </div>
  );
}

export default Game;
