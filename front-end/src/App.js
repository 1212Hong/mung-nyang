import GlobalStyle from "./components/style/GlobalStyle";
import "./css/App.css";
import SelectLiar from "./views/components/SelectLiar";

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <SelectLiar></SelectLiar>
        </div>
    );
}

export default App;
