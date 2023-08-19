import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartGamePage from "./pages/start-game";
import GamePage from "./pages/game";
import ErrorPage from "./pages/error";

interface CustomRouteProps {
  path: string;
  element: React.ReactElement; // You can use JSX.Element if necessary
}

function App() {
  const CustomRoute: React.FC<CustomRouteProps> = ({ path, element }) => {
    return <Route path={path} element={element} />;
  };

  return (
    <Router>
      <Routes>
        <CustomRoute path="/quiz-project/" element={<StartGamePage />} />
        <CustomRoute path="/quiz-project/game" element={<GamePage />} />
        <CustomRoute path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
