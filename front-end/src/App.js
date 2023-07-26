import GlobalStyle from "./components/style/GlobalStyle";
import "./css/App.css";
import Timer from "./components/Timer";

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <span>도(그)라이(어 게임)</span>
            <Timer />
        </div>
    );
}

export default App;
