import { styled } from "styled-components";
import { ReactComponent as SettingIcon } from "../../assets/img/setting.svg";
import { ReactComponent as CameraIcon } from "../../assets/img/camera_on.svg";
import { ReactComponent as CameraOffIcon } from "../../assets/img/camera_off.svg";
import { ReactComponent as RefreshIcon } from "../../assets/img/icon_refresh_leftsquare.svg";

const Container = styled.div`
    background-color: var(--vanilla-cream);
    border-radius: 20px;
`;

const ContainerBody = styled.div`
    height: 720px;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    border-radius: 20px;

    @media (max-width: 1280px) {
        flex-direction: row;
    }
`;

const HeaderBox = styled.div`
    margin: 0 auto 12.5px 10px;
`;
const LeftBox = styled.div`
    width: 600px;
    height: 650px;
    background-color: var(--dusty-pink-white);
    border-radius: 10px;
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const RightBox = styled.div`
    width: 680px;
    height: 610px;
    background-color: var(--dusty-pink-white);
    border-radius: 10px;
    margin: 20px;
    padding: 20px 0;
    color: var(--black);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const RightItem = styled.div`
    padding: 0 30px;
`;

const MicBox = styled.div`
    background: var(--dusty-pink-light);
    width: 500px;
    height: 45px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const MicBar = styled.div.attrs((props) => ({
    style: {
        width: `${Math.min(props.volume * 500, 500)}px`,
    },
}))`
    border-radius: 10px;
    background: var(--dusty-pink-light);
    height: 45px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const VolumeSlider = styled.input`
    width: 480px;
    height: 30px;
    appearance: none;
    background: var(--dusty-pink-light);
    outline: none;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    margin: 10px 0;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 30px;
        height: 30px;
        background: var(--dusty-pink-dark);
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

const NickName = styled.div`
    width: 270px;
    height: 80px;
    background-color: var(--dusty-pink-white);
    border-radius: 20px;
    display: flex;
    justify-content: center;
`;
const FlexRowBox = styled.div`
    padding: 0 30px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-between;
`;

const DescBox = styled.div`
    text-align: center;
    margin-right: 100px;
`;

export {
    Container,
    ContainerBody,
    HeaderBox,
    LeftBox,
    RightBox,
    RightItem,
    MicBar,
    MicBox,
    VolumeSlider,
    CameraIconWrapper,
    EmptyScreen,
    NickName,
    FlexRowBox,
    SettingIcon,
    CameraIcon,
    CameraOffIcon,
    RefreshIcon,
    DescBox,
};
