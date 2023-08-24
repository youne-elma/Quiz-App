interface Answer {
  name: string;
  id: string;
  index: number;
  isCorrect: boolean;
}
interface ButtonGroupsProps {
  answers: Answer[];
  answered: boolean;
  choices: string[];
  setChoices: React.Dispatch<React.SetStateAction<string[]>>;
  buttonGroup: number[];
  setButtonGroup: React.Dispatch<React.SetStateAction<number[]>>;
  isActive: boolean[];
  setIsActive: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function ButtonGroups({
  answers,
  answered,
  choices,
  setChoices,
  buttonGroup,
  setButtonGroup,
  isActive,
  setIsActive,
}: ButtonGroupsProps) {
  return (
    <div className="answers">
      {answers.map(
        (
          ans: {
            name: string;
            id: string;
            index: number;
            isCorrect: boolean;
          },
          index
        ) => {
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
            <button
              className={`answers-btn
                ${isActive[index] && "blue"}
                ${answered && "faded"}
                ${isActive[index] && answered && "green"}
                ${answered && ans.isCorrect && "green"}
                ${isActive[index] && answered && !ans.isCorrect && "red"}
              `}
              type="button"
              onClick={() => {
                const newButtonGroup = [...buttonGroup];
                newButtonGroup[ans.index] = parseInt(ans.id);
                setButtonGroup(newButtonGroup);

                const newChoices = [...choices];
                newChoices[ans.index] = fixedAnswers;
                setChoices(newChoices);

                const newIsActive = isActive.map((_, i) => i === index);
                setIsActive(newIsActive);
              }}
              disabled={answered}
              key={ans.id}
            >
              {fixedAnswers}
            </button>
          );
        }
      )}
    </div>
  );
}

export default ButtonGroups;
