import { useEffect, useState } from "react";
import { useData } from "../../context/useDataContext";
import { Link } from "react-router-dom";
import LoadingLayout from "../../components/Loading";
import blop3 from "../../assets/blop3.png";
import blop4 from "../../assets/blop4.png";

import Question from "./Question";
import React from "react";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function Game() {
  const {
    loading,
    buttonArray,
    correctAnswers,
    resetAndFetchQuestions,
    formData,
    initChoicesArray,
    initButtonGroupArray,
  } = useData();

  const [message, setMessage] = useState<boolean>(false);
  const [choices, setChoices] = useState<string[]>(initChoicesArray);

  const [buttonGroup, setButtonGroup] =
    useState<number[]>(initButtonGroupArray);
  const [answered, setAnswered] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

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

  const playAgain = () => {
    setMessage(false);
    setChoices(initChoicesArray);
    setButtonGroup(initButtonGroupArray);
    setAnswered(false);
    setCount(0);
    resetAndFetchQuestions();
  };

  useEffect(() => {
    playAgain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("test");

  return (
    <div className="main">
      <img className="blop3" src={blop3} alt="pictureBlop" />
      {loading && <LoadingLayout />}
      <div className="questions">
        {buttonArray.map((item, index) => {
          return (
            <Question
              key={index}
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
          <React.Fragment>
            <p>
              You scored {count}/{formData.questionNumber} correct answers
            </p>
            <button type="button" className="checkAnswer" onClick={playAgain}>
              Play Again
            </button>
            <Link to="/Quiz-App/" className="playAgain">
              <button type="button" className="checkAnswer">
                Go Back
              </button>
            </Link>
          </React.Fragment>
        )}
      </div>
      <img className="blop4" src={blop4} />
    </div>
  );
}

export default Game;
