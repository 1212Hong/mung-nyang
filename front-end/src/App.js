import DropDown from "./components/DropDown";
import GlobalStyle from "./components/style/GlobalStyle";
import "./css/App.css";
import Button from "./components/Button";
import { ReactComponent as DogRun } from "./assets/img/signaling_8896988 1.svg";

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <span>도(그)라이(어 게임)</span>
            <DropDown />
            <Button>정답</Button>
            <Button type="icon" whileTab={{ scale: 0.5 }}>
                hi
                <DogRun />
            </Button>
        </div>
    );
}

export default App;
