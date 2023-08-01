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

    input {
        min-width: 200px;
        min-height: 30px;
    }

    button {
        background: var(--vanilla-cream);
        font-size: 16px;
        color: var(--white);
        border-radius: 30px;
    }
`;

export default GlobalStyle;
