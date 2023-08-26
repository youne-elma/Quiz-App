import { Link } from "react-router-dom";

import blop1 from "../../assets/blop1.png";
import blop2 from "../../assets/blop2.png";
import spikeImage from "../../assets/spike-image.png";
import volleyballIcon from "../../assets/volleyball-icon.png";

function StartGame() {
  return (
    <div className="main start-game">
      <img className="blop1" src={blop1} alt="blop1" />
      <img className="blop2" src={blop2} alt="blop2" />
      <div className="main-text">
        <h1 className="title-quiz">Quiz project</h1>
        <p className="parag-quiz">
          a project quiz,
          <br /> hurry up and start the quiz
        </p>
        <Link to="/Quiz-App/game" className="start-button">
          start the quiz
        </Link>
      </div>
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
