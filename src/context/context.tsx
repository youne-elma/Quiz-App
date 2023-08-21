import React, { ReactNode, createContext, useEffect, useState } from "react";

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
}

interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const url = "https://opentdb.com/api.php?amount=5";

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
    console.log("test");
  };

  useEffect(() => {
    pullData();
  }, [url]);

  return (
    <DataContext.Provider value={{ questions, loading }}>
      {children}
    </DataContext.Provider>
  );
};
