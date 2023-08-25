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
          <Route path="/Quiz-App/" element={<StartGamePage />} />
          <Route path="/Quiz-App/game" element={<GamePage />} />
          <Route path="/Quiz-App/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
