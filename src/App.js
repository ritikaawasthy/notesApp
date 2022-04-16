import "./App.css";
import "./style/color.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import MockAPI from "./mockman";
import {LandingPage, HomePage, LabelPage, ArchivePage, TrashPage} from "./pages/index";
import {NavBar} from "./components/index";
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/note" element={<HomePage/>}></Route>
        <Route path="/label" element={<LabelPage/>}></Route>
        <Route path="/archive" element={<ArchivePage/>}></Route>
        <Route path="/trash" element={<TrashPage/>}></Route>
        <Route path="/mockman" element={<MockAPI/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
