import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const BtnList = styled.li`
    display: inline-block;
`;

const setArr = [3, 6, 9];

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const getClickOutside = (e) => {
            if (isOpen && e.target !== menuRef.current) {
                setIsOpen(false);
            }
        };
        window.addEventListener("click", getClickOutside);
        return () => {
            window.removeEventListener("click", getClickOutside);
        };
    });

    return (
        <div
            className="dropdown"
            onClick={() => {
                setIsOpen(!isOpen);
                console.log("클릭!");
            }}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 1, y: "10%" }}
                        animate={{ opacity: 1, y: "0%" }}
                        exit={{
                            opacity: 1,
                            y: "20%",
                            transition: { duration: "0.35" },
                        }}
                        transition={{
                            type: "spring",
                            stiffness: "100",
                            duration: "1",
                        }}
                        ref={menuRef}
                    >
                        {setArr.map((item, idx) => {
                            return (
                                <BtnList key={idx}>
                                    <Button
                                        onClick={() => {
                                            console.log(item);
                                            // method();
                                        }}
                                    >
                                        {item}세트
                                    </Button>
                                </BtnList>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
            <Button width="130px" height="50px">
                Menu
                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </div>
            </Button>
        </div>
    );
};

export default DropDown;
