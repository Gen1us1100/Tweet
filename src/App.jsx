import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home/Home";
import TwitterPage from "./assets/pages/Twitter/TwitterPage";
import "./assets/sass/index.scss";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tweet" element={<TwitterPage />} />
        </Routes>
    );
}

export default App;
