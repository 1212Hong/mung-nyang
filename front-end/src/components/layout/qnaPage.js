import { styled } from "styled-components";

const DescContainer = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
`;
const VideoContainer = styled.div`
    width: 100%;
    height: 38%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;
const VideoBox = styled.div`
    margin: auto;
    width: 30%;
    height: 80%;
    box-sizing: border-box;
    border-radius: 5px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
const DescBox = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 0 30px;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    background: var(--vanilla-cream);
    box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.5);
`;

export { VideoContainer, DescContainer, DescBox, VideoBox };
