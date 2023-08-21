import React, { ReactNode, createContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface DataContextType {
  questions: Question[];
  loading: boolean;
  correctAnswers: string[];
  buttonArray: ButtonArrayType[];
}

interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

interface Answer {
  id: string;
  index: number;
  isCorrect: boolean;
  name: string;
}

interface ButtonArrayType {
  question: string;
  answers: Answer[];
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [buttonArray, setButtonArray] = useState<ButtonArrayType[]>([]);

  const url = "https://opentdb.com/api.php?amount=5";

  const shuffle = (array: Answer[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const pullData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        setQuestions(responseData.results);
      } else {
        setQuestions([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Caught Error:", error);
    }
  };

  useEffect(() => {
    pullData();
  }, [url]);

  useEffect(() => {
    const bigArray: ButtonArrayType[] = [];
    const correctAnswerArray: string[] = [];
    questions.map((item, index) => {
      const correctAnswers1 = item.correct_answer;
      correctAnswerArray.push(correctAnswers1);
      setCorrectAnswers(correctAnswerArray);
      const wrongAnswers = item.incorrect_answers;
      const wrongAnswersArray = wrongAnswers.map((temp) => ({
        name: temp,
        isCorrect: false,
        id: nanoid(),
        index,
      }));
      const correctAnswer = {
        name: item.correct_answer,
        isCorrect: true,
        id: nanoid(),
        index,
      };
      wrongAnswersArray.push(correctAnswer);

      console.log(wrongAnswersArray);

      shuffle(wrongAnswersArray);
      const questionObject = {
        question: item.question,
        answers: wrongAnswersArray,
      };
      return bigArray.push(questionObject);
    });
    setButtonArray(bigArray);
    // console.log(bigArray);
    // console.log(correctAnswerArray + "correctAnswerArray");
  }, [questions]);

  return (
    <DataContext.Provider
      value={{ questions, loading, buttonArray, correctAnswers }}
    >
      {children}
    </DataContext.Provider>
  );
};
