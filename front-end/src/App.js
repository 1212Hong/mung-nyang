import "./css/App.css";
import Router from "./router/Router";
import "./assets/fonts/font.css";

function App() {
    // const APPLICATION_SERVER_URL =
    //     process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/";
    return (
        <>
            <Router />
        </>
    );
}

export default App;
