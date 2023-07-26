import GlobalStyle from "./components/style/GlobalStyle";
import "./css/App.css";
import "./views/WordDescription";
import WordDescription from "./views/WordDescription";
function App() {
    return (
        <div className="App">
            <GlobalStyle />
            test
            <span>도(그)라이(어 게임)</span>
            <WordDescription />
        </div>
    );
}

export default App;
