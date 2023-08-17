import React, { useEffect, useState } from "react";
import {
    ReadyModalView,
    ModalViewDescDiv,
    ModalViewResultDiv,
    ModalViewButtonDiv,
} from "../layout/modal";
import { ovActions } from "../../store/openviduSlice";
import { useDispatch } from "react-redux";

const DropUserModal = () => {
    const [time, setTime] = useState(5);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
            console.log(time);
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            dispatch(ovActions.saveCurrentVideoDevice(undefined));
            dispatch(ovActions.leaveSession());
        }, 5000);
    }, []);

    return (
        <ReadyModalView onClick={(e) => e.stopPropagation()}>
            <ModalViewDescDiv>강퇴 당했습니다..</ModalViewDescDiv>

            <ModalViewResultDiv className="vote-res-div">
                다른 방 혹은 재입장 해주세요...
            </ModalViewResultDiv>
            <ModalViewButtonDiv>{time} 초 남았습니다</ModalViewButtonDiv>
        </ReadyModalView>
    );
};

export default DropUserModal;
