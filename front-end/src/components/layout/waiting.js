import { styled } from "styled-components";

const Container = styled.div`
    background-color: var(--beige-dark);
    border-radius: 20px;
    height: 720px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 20px;
`;

const Leftbox = styled.div`
    width: 897px;
    height: 700px;
    background-color: var(--beige);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Rightbox = styled.div`
    width: 300px;
    height: 700px;
    background-color: var(--beige);
    border-radius: 20px;
`;

const Videobox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VideoboxGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 27.5px;
    grid-auto-flow: row;
    align-items: center;
    justify-content: center;
`;

const ChattingBox = styled.div`
    height: 280px;
    background-color: var(--beige-dark);
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
`;
const ChatBox = styled.div`
    height: 250px;
`;
const ChattingInputBox = styled.div`
    height: 30px;
    margin: 5px;
    border-radius: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const MenuBox = styled.div`
    height: 50px;
    background-color: var(--beige-reverse);
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
`;

const StartnSetBox = styled.div`
    height: 50px;
    margin: 15px;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    grid-template-columns: 135px 135px;
`;

export {
    Container,
    Leftbox,
    Rightbox,
    Videobox,
    VideoboxGrid,
    ChattingBox,
    ChatBox,
    ChattingInputBox,
    MenuBox,
    StartnSetBox,
};
