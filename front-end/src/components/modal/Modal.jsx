import React from "react";
import RuleModal from "./RuleModal";
import ReadyModal from "./ReadyModal";
import ChooseModal from "./ChooseModal";
import AnswerModal from "./AnswerModal";
import { ModalBackdrop, ModalContainer } from "../layout/modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../store/modalSlice";

const MODAL_TYPES = {
    RuleModal: "RuleModal",
    ReadyModal: "ReadyModal",
    ResultModal: "ResultModal",
    ChooseModal: "ChooseModal",
    AnswerModal: "AnswerModal",
};

const MODAL_COMPONENTS = [
    {
        type: MODAL_TYPES.RuleModal,
        component: <RuleModal />,
    },
    {
        type: MODAL_TYPES.ReadyModal,
        component: <ReadyModal />,
    },
    {
        type: MODAL_TYPES.ChooseModal,
        component: <ChooseModal />,
    },
    {
        type: MODAL_TYPES.AnswerModal,
        component: <AnswerModal />,
    },
];

const Modal = () => {
    // modal type을 string 형태로 받습니다.
    const { modalType, isOpen } = useSelector(selectModal);
    const dispatch = useDispatch();
    if (!isOpen) return;

    const findModal = MODAL_COMPONENTS.find((modal) => {
        return modal.type === modalType;
    });

    const renderModal = () => {
        return findModal.component;
    };
    //modal 종료 방지
    const maintainModal = ["ReadyModal", "AnswerModal"];
    const ModalCheck = maintainModal.includes(modalType) ? true : false;
    return (
        <ModalContainer>
            <ModalBackdrop
                onClick={() => (ModalCheck ? {} : dispatch(closeModal()))}
            >
                {renderModal()}
            </ModalBackdrop>
        </ModalContainer>
    );
};

export default Modal;
