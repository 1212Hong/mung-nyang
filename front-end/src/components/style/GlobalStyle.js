import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    html {
        --black: #000000;
        --ash-black: #222;
        --white: #f5f5f5;
        --beige: #f2ead3;
        --beige-dark: #ded7be;
        --brown: #603808;
        --brown-dark: #3d2302;
        --beige-pink: #d8bab1;
        --dusty-pink: #dbbebb;
        --dusty-pink-dark: #847070;
        --dusty-pink-light: #e2d0d0;
        --dusty-pink-white: #F4EBEB;
        --vanilla-cream: #F4D7C5;
        --macciato: #AC8367;
        --orange: #f98e11;
    }
    .App{
        width: 1280px;
        height: 750px;
        margin: 0 150px;
    }
`;

export default GlobalStyle;
