import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartGamePage from "./pages/start-game";
import GamePage from "./pages/game";
import ErrorPage from "./pages/error";
import { DataProvider } from "./context/context";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/quiz-project/" element={<StartGamePage />} />
          <Route path="/quiz-project/game" element={<GamePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
