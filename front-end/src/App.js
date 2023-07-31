import GlobalStyle from "./components/style/GlobalStyle";
import "./css/App.css";
import Router from "./router/Router";
import { Provider } from "react-redux";
import store from "./store/store";
import "./assets/fonts/font.css";
import QNA from "./views/components/QnAPage";

function App() {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <QNA></QNA>
            <Router />
        </Provider>
    );
}

export default App;
