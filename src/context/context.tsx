import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { nanoid } from "nanoid";

interface DataCategories {
  id: number;
  name: string;
}

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface FormDataType {
  questionNumber: string;
  categorie: string;
  difficulty: string;
  type: string;
}

interface DataContextType {
  questions: Question[];
  loading: boolean;
  correctAnswers: string[];
  buttonArray: ButtonArrayType[];
  resetAndFetchQuestions: () => Promise<void>;
  categoriesData: DataCategories[];
  setCategoriesData: React.Dispatch<React.SetStateAction<DataCategories[]>>;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  formData: FormDataType;
  initButtonGroupArray: number[];
  initChoicesArray: string[];
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
  const initialFormData: FormDataType = {
    questionNumber: "",
    categorie: "",
    difficulty: "",
    type: "",
  };

  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [categoriesData, setCategoriesData] = useState<DataCategories[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [buttonArray, setButtonArray] = useState<ButtonArrayType[]>([]);

  const [initButtonGroupArray, setInitButtonGroupArray] = useState<number[]>(
    []
  );
  const [initChoicesArray, setInitChoicesArray] = useState<string[]>([]);

  const url = useRef("");
  const urlCategorie = "https://opentdb.com/api_category.php";
  console.log("Test");
  console.log(formData);

  useEffect(() => {
    const { questionNumber, categorie, difficulty, type } = formData;

    setInitButtonGroupArray(
      Array.from({ length: parseInt(questionNumber, 10) }, () => 0)
    );
    setInitChoicesArray(
      Array.from({ length: parseInt(questionNumber, 10) }, () => "")
    );

    console.log(initButtonGroupArray);
    console.log(initChoicesArray);

    url.current = `https://opentdb.com/api.php?amount=${questionNumber}`;

    if (
      questionNumber == "" &&
      categorie == "" &&
      difficulty == "" &&
      type == ""
    ) {
      url.current = "";
    } else if (categorie != "Any Category") {
      url.current += `&categorie=${categorie}`;
    } else if (difficulty != "Any Difficulty") {
      url.current += `&difficulty=${difficulty}`;
    } else if (type != "Any Type") {
      url.current += `&type=${type}`;
    }

    console.log(url.current);
  }, [formData]);

  const shuffle = (array: Answer[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const pullData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url.current);
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

  const pullDataCategories = async () => {
    try {
      const response = await fetch(urlCategorie);
      if (response.ok) {
        const responseData = await response.json();
        setCategoriesData(responseData.trivia_categories);
      } else {
        setCategoriesData([]);
      }
    } catch (error) {
      console.error("Caught Error:", error);
    }
  };

  const resetAndFetchQuestions = async () => {
    setQuestions([]);
    setLoading(true);
    try {
      const response = await fetch(url.current);
      if (response.ok) {
        const responseData = await response.json();
        setQuestions(responseData.results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Caught Error:", error);
    }
  };

  useEffect(() => {
    pullDataCategories();
  }, [urlCategorie]);

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

      shuffle(wrongAnswersArray);
      const questionObject = {
        question: item.question,
        answers: wrongAnswersArray,
      };
      return bigArray.push(questionObject);
    });
    setButtonArray(bigArray);
  }, [questions]);

  return (
    <DataContext.Provider
      value={{
        questions,
        loading,
        buttonArray,
        correctAnswers,
        resetAndFetchQuestions,
        categoriesData,
        setCategoriesData,
        setFormData,
        formData,
        initButtonGroupArray,
        initChoicesArray,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
