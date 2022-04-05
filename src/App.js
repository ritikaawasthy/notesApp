import "./App.css";
import "./style/color.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import MockAPI from "./mockman";
import {LandingPage} from "./pages/index";
import {NavBar} from "./components/index";
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/mockman" element={<MockAPI/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
