import { useState } from "react";
import { apiInstance } from "../api/index";

const api = apiInstance();
function App() {
    const [curPhase, setCurPhase] = useState(1);

    async function CallPhase() {
        await api
            .get(`/gamerooms/curPhase`, {
                withCredentials: true,
            })
            .then((response) => setCurPhase(response.data))
            .catch((response) => {
                setCurPhase(-1);
                console.log(response.data);
            });
    }
    return (
        <div>
            <button onClick={CallPhase}>api 호출</button>
            return값? : {curPhase}
        </div>
    );
}

export default App;
