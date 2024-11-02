import "./styles/App.css";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import AppPage from "./pages/AppPage";

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <AppPage />
    </Router>
  );
}

export default App;
