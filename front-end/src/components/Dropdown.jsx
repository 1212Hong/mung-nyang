import { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

export const DropdownContainer = styled.div`
    width: 130px;
`;

export const DropdownBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 14px;
    border: 2px solid #d2d2d2;
`;

export const DropdownSelect = styled.p`
    font-weight: bold;
`;

export const DropdownMenu = styled.ul`
    display: ${(props) => (props.isActive ? `block` : `none`)};
    width: 126px;
    background-color: white;
    /* position: absolute; */
    border: 2px solid var(--pink);
`;

export const DropdownItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 9px 14px;
    border-bottom: 3px solid var(--pink);
    border-top: none;

    &:last-child {
        border-bottom: none;
    }
    &:hover {
        cursor: pointer;
    }
`;

export const ItemName = styled.p`
    font-weight: bold;
`;

const dropdownItems = [3, 6, 9, "직접 입력"];

const Dropdown = () => {
    const [isActive, setIsActive] = useState(false);
    const [setCnt, setSetCnt] = useState(0);

    const onActiveToggle = useCallback(() => {
        setIsActive((prev) => !prev);
    }, []);

    const onSelectSet = useCallback((e) => {
        const targetId = e.target.id;

        if (targetId === "item_name") {
            setSetCnt(e.target.parentElement.innertText);
        } else if (targetId === "item") {
            setSetCnt(e.target.innertText);
        }

        setIsActive((prev) => !prev);
    }, []);

    return (
        <DropdownContainer>
            <DropdownMenu isActive={isActive}>
                {dropdownItems.map((item) => (
                    <DropdownItemContainer
                        id="item"
                        key={item}
                        onClick={onSelectSet}
                    >
                        <ItemName id="item_name">{item}</ItemName>
                    </DropdownItemContainer>
                ))}
            </DropdownMenu>
            <Button
                border="5px"
                width="130px"
                height="50px"
                onClick={onActiveToggle}
            >
                {setCnt ? (
                    <>
                        <ItemName>{setCnt}</ItemName>
                    </>
                ) : (
                    <>
                        <DropdownSelect>세트 설정</DropdownSelect>
                        <div
                            className="arrow"
                            style={{ transformOrigin: "50% 55%" }}
                        >
                            <svg width="15" height="15" viewBox="0 0 20 20">
                                <path d="M0 7 L 20 7 L 10 16" />
                            </svg>
                        </div>
                    </>
                )}
            </Button>
        </DropdownContainer>
    );
};

export default Dropdown;
