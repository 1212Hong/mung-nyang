import React, { useEffect, useState } from "react";
import { stagger, useAnimate } from "framer-motion";
import Button from "./Button";
import { styled } from "styled-components";

const Menu = styled.nav`
    filter: drop-shadow(1px 1px 1px var(--beige));
    width: 200px;
    /* ref: ${(props) => props.scope}; */
`;

const BtnList = styled.li`
    display: inline-block;
`;

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);
    const [setCnt, setSetCnt] = useState(3);

    const setArr = [3, 6, 9];

    const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

    function useMenuAnimation(isOpen) {
        const [scope, animate] = useAnimate();

        useEffect(() => {
            animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

            animate(
                "ul",
                {
                    clipPath: isOpen
                        ? "inset(0% 0% 0% 0% round 10px)"
                        : "inset(50% 90% 10% 50% round 10px)",
                },
                {
                    type: "spring",
                    bounce: 0,
                    duration: 0.5,
                },
            );

            animate(
                "li",
                isOpen
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
                {
                    duration: 0.2,
                    delay: isOpen ? staggerMenuItems : 0,
                },
            );
        });

        return scope;
    }

    function selectSet(idx) {
        console.log(setCnt);
        setSetCnt(setArr[idx]);
    }
    return (
        <Menu ref={scope}>
            <ul
                style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    clipPath: "inset(50% 90% 10% 50% round 10px)",
                }}
            >
                {setArr.map((item, idx) => {
                    return (
                        <BtnList key={idx}>
                            <Button onClick={() => selectSet(idx)}>
                                {item}
                            </Button>
                        </BtnList>
                    );
                })}
            </ul>
            <Button whileTap={0.8} onClick={() => setIsOpen(!isOpen)}>
                Menu
                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </div>
            </Button>
        </Menu>
    );
};

export default DropDown;
