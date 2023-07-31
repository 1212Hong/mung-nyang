import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};

    ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: var(--accent);
    }

    li {
        color: var(--background);
        display: block;
        transform-origin: -20px 50%;
    }
    
    ul,
    li {
        list-style: none;
        margin: 0;
        padding: 10px;
    }
`;

export default GlobalStyle;
