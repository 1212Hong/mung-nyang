import GlobalStyle from "./components/style/GlobalStyle";
import "./css/App.css";
import Router from "./router/Router";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/fonts/font.css";

function App() {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <Router />
        </Provider>
    );
}

export default App;
