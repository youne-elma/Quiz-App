import { Link } from "react-router-dom";

import blop1 from "../../assets/blop1.png";
import blop2 from "../../assets/blop2.png";
import spikeImage from "../../assets/spike-image.png";
import volleyballIcon from "../../assets/volleyball-icon.png";
import { useData } from "../../context/useDataContext";

function StartGame() {
  const { categoriesData } = useData();

  return (
    <div className="main start-game">
      <img className="blop1" src={blop1} alt="blop1" />
      <img className="blop2" src={blop2} alt="blop2" />
      <form className="main-text">
        <h1 className="title-quiz">Quiz project</h1>
        <p className="parag-quiz">
          a project quiz,
          <br /> hurry up and start the quiz
        </p>
        <div className="groupForm">
          <div className="selectForm">
            <label className="selectForm-text">Number of Questions:</label>
            <input
              className="selectTag"
              type="number"
              min="1"
              id="questionsNumber"
            />
          </div>
          <div className="selectForm">
            <label className="selectForm-text">Select the difficulty:</label>
            <select className="selectTag" name="category" id="category">
              <option selected>Any Category</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>
        <div className="groupForm">
          <div className="selectForm">
            <label className="selectForm-text">Select the Category:</label>
            <select className="selectTag" name="category" id="category">
              <option selected>Any Category</option>
              {categoriesData.map((item) => {
                return <option key={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="selectForm">
            <label className="selectForm-text">Select the Type:</label>
            <select className="selectTag" name="category" id="category">
              <option selected>Any Type</option>
              <option>Multiple Choice</option>
              <option>True / False</option>
            </select>
          </div>
        </div>
        <button type="submit" className="start-button" onClick={}>
          <Link to="/Quiz-App/game" className="linkStartButton">
            start the quiz
          </Link>
        </button>
      </form>
      <img className="spike-image" src={spikeImage} alt="spike volleyball" />
      <img
        className="volleyball-icon"
        src={volleyballIcon}
        alt="volleyball ball"
      />
    </div>
  );
}

export default StartGame;
