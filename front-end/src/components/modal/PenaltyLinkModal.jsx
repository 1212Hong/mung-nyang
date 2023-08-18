import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../store/modalSlice";
import Button from "../Button";
import { getPenaltyLink } from "../../api/game";

const LinkContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    z-index: 1000;
`;

const LinkBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    padding: 20px;
    width: 500px;
    height: 300px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
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
const LinkTitleBox = styled.div`
    padding: 10px;
    font-size: 24px;
    border-bottom: 1px solid gray;
    margin-bottom: 30px;
`;
const LinkContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    margin-bottom: 10px;
`;
const LinkContentDesc = styled.div`
    width: 20%;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px 0 0 5px;
`;
const LinkContentUrl = styled.div`
    width: 100%;
    padding: 5px;
    border: 1px solid gray;
`;
const LinkContentCopy = styled.div`
    width: 20%;
    border: 1px solid gray;
    padding: 5px;
    border-radius: 0 5px 5px 0;
    &:hover {
        cursor: pointer;
    }
`;
const LinkItem = styled.div`
    display: flex;
    margin-bottom: 8px;
`;
const LinkButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const PenaltyLinkModal = () => {
    const game = useSelector((state) => state.game);
    const { answerer } = game;
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId } = openvidu;
    const [penaltyLinkList, setPenaltyLinkList] = useState([]);
    const linkEndRef = useRef();
    const copyLink = async (link) => {
        await navigator.clipboard
            .writeText(link)
            .then((res) => alert("링크 복사 완료!"));
    };
    useEffect(() => {
        getPenaltyLink(mySessionId).then((response) =>
            setPenaltyLinkList(response.data),
        );
    });
    useEffect(() => {
        scrollToBottom();
    }, [openvidu.messageList]);
    const scrollToBottom = () => {
        if (linkEndRef.current) {
            linkEndRef.current.scrollTop = linkEndRef.current.scrollHeight;
        }
    };
    return (
        <LinkContainer>
            <LinkBox>
                <LinkTitleBox> 벌칙 영상 </LinkTitleBox>
                <LinkContentBox ref={linkEndRef}>
                    {penaltyLinkList.length > 0 ? (
                        penaltyLinkList.map((item, index) =>
                            item != null ? (
                                <React.Fragment key={index}>
                                    <LinkItem>
                                        <LinkContentDesc>게임</LinkContentDesc>
                                        <LinkContentUrl>
                                            {item && item.length > 48
                                                ? item.slice(0, 48) + "..."
                                                : item}
                                        </LinkContentUrl>
                                        <LinkContentCopy
                                            onClick={() => copyLink(item)}
                                        >
                                            복사
                                        </LinkContentCopy>
                                    </LinkItem>
                                </React.Fragment>
                            ) : null,
                        )
                    ) : (
                        <span>아직 링크가 없어요!</span>
                    )}
                </LinkContentBox>
                <LinkButtonBox>
                    <Button onClick={() => dispatch(closeModal())}>
                        돌아가기
                    </Button>
                </LinkButtonBox>
            </LinkBox>
        </LinkContainer>
    );
};

export default PenaltyLinkModal;
