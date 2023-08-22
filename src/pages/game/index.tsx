import { useState } from "react";
import { useData } from "../../context/useDataContext";
import { Link } from "react-router-dom";
import LoadingLayout from "../../components/Loading";
import blop3 from "../../assets/blop3.png";
import blop4 from "../../assets/blop4.png";

import Question from "./Question";
// import ButtonGroups from "./ButtonGroups";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function Game() {
  const [message, setMessage] = useState<boolean>(false);
  const initChoicesArray: string[] = ["", "", "", "", ""];
  const [choices, setChoices] = useState<string[]>(initChoicesArray);
  const initButtonGroupArray: number[] = [0, 0, 0, 0, 0];
  const [buttonGroup, setButtonGroup] =
    useState<number[]>(initButtonGroupArray);
  const [answered, setAnswered] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const { loading, buttonArray, correctAnswers } = useData();

  // const quizQuestions = buttonArray.map((item) => {
  //   const unicodeQ = item.question;
  //   const diffQuestions = unicodeQ
  //     .replace(/&quot;/g, '"')
  //     .replace(/&#039;/g, "'")
  //     .replace(/&amp;/g, "&")
  //     .replace(/&rsquo;/g, "")
  //     .replace(/&oacute;/g, "Ó")
  //     .replace(/&uacute;/g, "ú")
  //     .replace(/&eacute;/g, "é")
  //     .replace(/&prime;/g, "`")
  //     .replace(/&lsquo/g, "“")
  //     .replace(/&rsquo/g, "”")
  //     .replace(/&divide;/g, "/");
  //   const answerButtons = item.answers.map((ans) => {
  //     const unicodeA = ans.name;
  //     const fixedAnswers = unicodeA
  //       .replace(/&quot;/g, '"')
  //       .replace(/&#039;/g, "'")
  //       .replace(/&amp;/g, "&")
  //       .replace(/&oacute;/g, "Ó")
  //       .replace(/&uacute;/g, "ú")
  //       .replace(/&eacute;/g, "é")
  //       .replace(/&prime;/g, "`")
  //       .replace(/&lsquo/g, "“")
  //       .replace(/&rsquo/g, "”")
  //       .replace(/&divide;/g, "/");
  //     return (
  //       <ButtonGroups
  //         fixedAnswers={fixedAnswers}
  //         id={ans.id}
  //         index={ans.index}
  //         isCorrect={ans.isCorrect}
  //         answered={answered}
  //         choices={choices}
  //         setChoices={setChoices}
  //         buttonGroup={buttonGroup}
  //         setButtonGroup={setButtonGroup}
  //         active={buttonGroup[ans.index] === parseInt(ans.id)}
  //       />
  //     );
  //   });
  //   return <Question questions={diffQuestions} answerButtons={answerButtons} />;
  // });

  const checkAnswers = (correctResp: string[], choice: string[]) => {
    setCount(0);
    if (choice.includes("")) {
      setMessage(true);
    }
    for (let i = 0; i < correctResp.length; i += 1) {
      if (correctResp[i] === choice[i]) {
        setCount((prevState) => prevState + 1);
      } else if (!choice.includes("")) {
        setAnswered(true);
        setMessage(false);
      }
    }
  };

  return (
    <div className="main">
      <img className="blop3" src={blop3} alt="pictureBlop" />
      {loading && <LoadingLayout />}
      <div className="questions">
        {buttonArray.map((item) => {
          return (
            <Question
              item={item}
              answered={answered}
              choices={choices}
              setChoices={setChoices}
              buttonGroup={buttonGroup}
              setButtonGroup={setButtonGroup}
            />
          );
        })}
      </div>
      <div className="result">
        {message && <p className="message">You must answer all questions</p>}
        {!answered && (
          <button
            type="button"
            className="checkAnswer"
            onClick={() => checkAnswers(correctAnswers, choices)}
          >
            Check the answers
          </button>
        )}
        {answered && (
          <>
            <p>You scored {count}/5 correct answers</p>
            <Link to="/quiz-project/" className="playAgain">
              <button type="button" className="checkAnswer">
                Play Again
              </button>
            </Link>
          </>
        )}
      </div>
      <img className="blop4" src={blop4} alt="pictureBlop" />
    </div>
  );
}

export default Game;
