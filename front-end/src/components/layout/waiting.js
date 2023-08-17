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
    box-shadow: 7px 7px 5px rgb(0, 0, 0, 0.2);
`;

const Rightbox = styled.div`
    width: 300px;
    height: 700px;
    background-color: var(--beige);
    border-radius: 20px;
    box-shadow: 7px 7px 5px rgb(0, 0, 0, 0.2);
`;

const Videobox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; /* 수직 배치 */
    margin-top: -20px;
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
    padding: 5px 10px;
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        width: 10px;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        height: 20%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }
`;
const ChatBox = styled.div`
    /* padding: 5px; */
    overflow: auto;
    height: 100%;
`;
const ChatItem = styled.div`
    padding: 0px 15px 0px 10px;
    font-size: 16px;
    color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: ${(props) =>
        props.align === undefined ? "flex-start" : "flex-end"};
    > div {
        margin-bottom: 10px;
    }
`;
const ChatItemName = styled.div`
    font-size: 16px;
`;
const ChatItemMessage = styled.div`
    max-width: 100%;
    width: fit-content;
    padding: 8px;
    border-radius: ${(props) =>
        props.align === undefined
            ? "0px 10px 10px 10px"
            : "10px 0px 10px 10px"};
    background-color: var(--macciato);
    overflow-wrap: break-word;
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

const VideoUserName = styled.div`
    font-size: 14px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px;
    border-radius: 4px;
    color: white;
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
    ChatItem,
    ChatItemName,
    ChatItemMessage,
    VideoUserName,
};
