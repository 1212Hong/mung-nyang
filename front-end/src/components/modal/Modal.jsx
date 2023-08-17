import React from "react";
import RuleModal from "./RuleModal";
import ReadyModal from "./ReadyModal";
import ChooseModal from "./ChooseModal";
import AnswerModal from "./AnswerModal";
import PenaltyLinkModal from "./PenaltyLinkModal";
import { ModalBackdrop, ModalContainer } from "../layout/modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../store/modalSlice";
import NoReadyModal from "./NoReadyModal";
import DropUserModal from "./DropUserModal";

const MODAL_TYPES = {
    RuleModal: "RuleModal",
    ReadyModal: "ReadyModal",
    ResultModal: "ResultModal",
    ChooseModal: "ChooseModal",
    AnswerModal: "AnswerModal",
    NoReadyModal: "NoReadyModal",
    PenaltyLinkModal: "PenaltyLinkModal",
    DropUserModal: "DropUserModal",
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
    {
        type: MODAL_TYPES.NoReadyModal,
        component: <NoReadyModal />,
    },
    {
        type: MODAL_TYPES.PenaltyLinkModal,
        component: <PenaltyLinkModal />,
    },
    {
        type: MODAL_TYPES.DropUserModal,
        component: <DropUserModal />,
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
    const maintainModal = [
        "ReadyModal",
        "AnswerModal",
        "PenaltyLinkModal",
        "DropUserModal",
    ];
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
