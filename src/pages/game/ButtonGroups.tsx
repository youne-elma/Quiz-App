interface ButtonGroupsProps {
  id: string;
  setButtonGroup: React.Dispatch<React.SetStateAction<number[]>>;
  buttonGroup: number[];
  setChoices: React.Dispatch<React.SetStateAction<string[]>>;
  choices: string[];
  active: boolean;
  answered: boolean;
  isCorrect: boolean;
  fixedAnswers: string;
  index: number;
}

function ButtonGroups({
  id,
  setButtonGroup,
  buttonGroup,
  setChoices,
  choices,
  active,
  answered,
  isCorrect,
  fixedAnswers,
  index,
}: ButtonGroupsProps) {
  const clickHandler = () => {
    const newButtonGroup = [...buttonGroup];
    newButtonGroup[index] = parseInt(id);

    setButtonGroup(newButtonGroup);

    const newChoices = [...choices];
    newChoices[index] = fixedAnswers;
    setChoices(newChoices);
  };

  return (
    <button
      className={`answers-btn
        ${active && "blue"}
        ${answered && "faded"}
        ${active && answered && "green"}
        ${answered && isCorrect && "green"}
        ${active && answered && !isCorrect && "red"}
        `}
      type="button"
      onClick={() => clickHandler()}
      disabled={answered}
      key={id}
    >
      {fixedAnswers}
    </button>
  );
}

export default ButtonGroups;
