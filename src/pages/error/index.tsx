import { Link } from "react-router-dom";

import gifblop1 from "../../assets/gifblop1.gif";
import gifblop2 from "../../assets/gifblop2.gif";

function Error() {
  return (
    <div className="main start-game">
      <img src={gifblop1} className="gifBlop1" alt="gif blop 1" />
      <div className="main-text">
        <h1 className="title-quiz">Error 404 page</h1>
        <Link to="/Quiz-App/" className="error-button">
          Go back
        </Link>
      </div>
      <img src={gifblop2} className="gifBlop2" alt="gif blop 2" />
    </div>
  );
}

export default Error;
