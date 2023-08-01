import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import useMenuAnimation from "../hooks/useMenuAnimation";

const Menu = styled.div`
    filter: drop-shadow(1px 1px 1px var(--beige));
    width: ${(props) => props.width};
    z-index: 2;
`;

const MenuList = styled.ul`
    display: ${(props) => (props.isOpen ? "" : "none")};
`;

const BtnList = styled.li`
    display: inline-block;
`;

const setArr = [3, 6, 9];

const DropDownSet = (props) => {
    const { width, cnt } = props;
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);
    const menuRef = useRef();

    useEffect(() => {
        console.log(isOpen);
        const getClickOutside = (e) => {
            if (isOpen && e.target !== menuRef.current) {
                setIsOpen(false);
            }
        };
        // window.addEventListener("click", getClickOutside);
        return () => {
            window.removeEventListener("click", getClickOutside);
        };
    });

    return (
        <Menu ref={scope} width={width}>
            <MenuList
                isOpen={isOpen}
                style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    clipPath: "inset(50% 90% 10% 50% round 10px)",
                }}
            >
                {setArr.map((item, idx) => {
                    return (
                        <BtnList key={idx}>
                            <Button width={width} height="30px">
                                {item}
                            </Button>
                        </BtnList>
                    );
                })}
            </MenuList>
            <Button
                width={width}
                height="50px"
                whileTap={0.8}
                onClick={() => setIsOpen(!isOpen)}
            >
                {cnt} set
                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </div>
            </Button>
        </Menu>
    );
};

export default DropDownSet;
