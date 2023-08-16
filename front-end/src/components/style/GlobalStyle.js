import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};

    ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: var(--beige);
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
    }

    input {
        min-width: 100px;
        min-height: 15px;
        padding: 10px;
        margin: 10px;
    }

    button {
        background: var(--vanilla-cream);
        font-size: 16px;
        color: var(--white);
        border-radius: 30px;
    }

    * {
    font-family: "Jua", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    }

    h1,
    h2,
    h3 {
        font-family: "BlackHanSans", sans-serif;
        font-style: normal;
    }

    h1 {
        font-weight: 700;
        font-size: 64px;
    }

    h2 {
        font-weight: 600;
        font-size: 48px;
    }

    h3 {
        font-weight: 500;
        font-size: 32px;
    }

    p {
        font-family: "gugi";
        font-size: 16px;
    }
    span {
        font-family: "jua";
        color: var(--black)
    }

    button {
        padding: 10px 20px;
    }
`;

export default GlobalStyle;
