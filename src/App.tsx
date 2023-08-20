import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartGamePage from "./pages/start-game";
import GamePage from "./pages/game";
import ErrorPage from "./pages/error";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quiz-project/" element={<StartGamePage />} />
        <Route path="/quiz-project/game" element={<GamePage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
