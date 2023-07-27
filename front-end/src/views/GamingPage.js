import axios from "axios";
import { useState } from "react";
import { apiInstance } from "../api/index";

const api = apiInstance();
function App() {
    const [curPhase, setCurPhase] = useState(1);

    async function CallPhase() {
        await api
            .get(`http://localhost:8080/gamerooms/phase`)
            .then((response) => setCurPhase(response.data))
            .error(setCurPhase(-1));
    }
    return (
        <div>
            <button onClick={CallPhase}>api 호출</button>
            return값? : {curPhase}
        </div>
    );
}

export default App;
