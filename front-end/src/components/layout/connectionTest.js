import { styled } from "styled-components";
import { ReactComponent as SettingIcon } from "../assets/img/setting.svg";
import { ReactComponent as CameraIcon } from "../assets/img/camera_on.svg";
import { ReactComponent as CameraOffIcon } from "../assets/img/camera_off.svg";

const TestSound = require("../assets/audio/test_sound.mp3");

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
    background-color: var(--beige);
    border-radius: 10px;
    margin: 20px;
    color: var(--black);
`;

const MicBox = styled.div`
    background: var(--white);
    width: 500px;
    height: 50px;
    margin: 10px;
`;
const MicBar = styled.div.attrs((props) => ({
    style: {
        width: `${Math.min(props.volume * 500, 500)}px`,
    },
}))`
    border: 1px solid black;
    background: var(--beige-dark);
    height: 50px;
    margin: 10px;
`;
const VolumeSlider = styled.input`
    width: 500px;
    height: 30px;
    appearance: none;
    background: var(--beige-dark);
    outline: none;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        background: var(--macciato);
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
    margin: 10px;
    justify-content: space-evenly;
`;

const NickName = styled.div`
    width: 300px;
    height: 80px;
    background-color: var(--beige-dark);
    border-radius: 20px;
`;

const Entrance = styled.div`
    width: 100px;
    height: 80px;
    background-color: var(--beige-dark);
    border-radius: 20px;
`;

export {
    SettingIcon,
    CameraIcon,
    CameraOffIcon,
    TestSound,
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
    Entrance,
};
