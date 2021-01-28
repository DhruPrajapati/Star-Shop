import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./components/GlobalState";
import Header from "./components/headers/header";
import MainPages from "./components/mainpages/pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
