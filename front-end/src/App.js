import GlobalStyle from "./components/global/GlobalStyle";
import VideoComponent from "./components/VideoBoxing";
import "./css/App.css";

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <span>도(그)라이(어 게임)</span>
            <VideoComponent />
        </div>
    );
}

export default App;
