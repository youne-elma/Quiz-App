import ButtonGroups from "./ButtonGroups";

interface Answer {
  name: string;
  id: string;
  index: number;
  isCorrect: boolean;
}

interface QuestionProps {
  item: {
    question: string;
    answers: Answer[];
  };
  answered: boolean;
  choices: string[];
  setChoices: React.Dispatch<React.SetStateAction<string[]>>;
  buttonGroup: number[];
  setButtonGroup: React.Dispatch<React.SetStateAction<number[]>>;
}

function Question({
  item,
  answered,
  choices,
  setChoices,
  buttonGroup,
  setButtonGroup,
}: QuestionProps) {
  const unicodeQ = item.question;
  const diffQuestions = unicodeQ
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;/g, "")
    .replace(/&oacute;/g, "Ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&eacute;/g, "é")
    .replace(/&prime;/g, "`")
    .replace(/&lsquo/g, "“")
    .replace(/&rsquo/g, "”")
    .replace(/&divide;/g, "/");

  return (
    <div className="question">
      <h1>{diffQuestions}</h1>
      <div className="answers">
        {item.answers.map(
          (ans: {
            name: string;
            id: string;
            index: number;
            isCorrect: boolean;
          }) => {
            const unicodeA = ans.name;
            const fixedAnswers = unicodeA
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
              .replace(/&amp;/g, "&")
              .replace(/&oacute;/g, "Ó")
              .replace(/&uacute;/g, "ú")
              .replace(/&eacute;/g, "é")
              .replace(/&prime;/g, "`")
              .replace(/&lsquo/g, "“")
              .replace(/&rsquo/g, "”")
              .replace(/&divide;/g, "/");
            return (
              <ButtonGroups
                fixedAnswers={fixedAnswers}
                id={ans.id}
                index={ans.index}
                isCorrect={ans.isCorrect}
                answered={answered}
                choices={choices}
                setChoices={setChoices}
                buttonGroup={buttonGroup}
                setButtonGroup={setButtonGroup}
                active={buttonGroup[ans.index] === parseInt(ans.id)}
              />
            );
          }
        )}
      </div>
      <hr
        style={{
          border: "1px solid #D4D8E7",
          backgroundColor: "#D4D8E7",
          width: "100%",
        }}
      />
    </div>
  );
}

export default Question;
