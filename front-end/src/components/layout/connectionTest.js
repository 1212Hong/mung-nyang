import { styled } from "styled-components";

const Container = styled.div`
    background-color: var(--beige-dark);
    border-radius: 20px;
`;

const ContainerBody = styled.div`
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const HeaderBox = styled.div`
    width: 1250px;
    height: 50px;
    background-color: var(--beige-dark);
    border-radius: 10px;
`;
const LeftBox = styled.div`
    width: 600px;
    height: 650px;
    background-color: var(--beige);
    border-radius: 10px;
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const RightBox = styled.div`
    width: 600px;
    height: 650px;
    background-color: var(--beige-dark);
    border-radius: 10px;
    margin: 20px;
    color: var(--black);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MicBox = styled.div`
    background: var(--white);
    width: 500px;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const MicBar = styled.div.attrs((props) => ({
    style: {
        width: `${Math.min(props.volume * 500, 500)}px`,
    },
}))`
    border-radius: 10px;
    background: var(--beige);
    height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const VolumeSlider = styled.input`
    width: 480px;
    height: 30px;
    appearance: none;
    background: var(--beige);
    outline: none;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    margin: 10px 0;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 30px;
        height: 30px;
        background: var(--beige-dark);
        border-radius: 50%;
        cursor: pointer;
    }
`;
const CameraIconWrapper = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    transform: ${(props) => (props.isOn ? "scale(1.1)" : "scale(1)")};
`;
const EmptyScreen = styled.div`
    width: 450px;
    height: 450px;
    background-color: var(--black);
    border-radius: 20px;
`;
const FooterBox = styled.div`
    width: 500px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
`;

const NickName = styled.div`
    width: 270px;
    height: 80px;
    background-color: var(--beige);
    border-radius: 20px;
`;
const TestButtonWrapper = styled.div`
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: flex-end;
`;

export {
    Container,
    ContainerBody,
    HeaderBox,
    LeftBox,
    RightBox,
    MicBar,
    MicBox,
    VolumeSlider,
    CameraIconWrapper,
    EmptyScreen,
    FooterBox,
    NickName,
    TestButtonWrapper,
};
