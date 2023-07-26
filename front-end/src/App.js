import Button from "./components/Button";
import GlobalStyle from "./components/style/GlobalStyle";
import "./css/App.css";

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <span>도(그)라이(어 게임)</span>
            <Button>hi</Button>
        </div>
    );
}

export default App;
