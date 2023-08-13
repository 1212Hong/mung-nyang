import React from "react";
import { styled } from "styled-components";
import Button from "./Button";

const Container = styled.div`
    /* width: 250px; */
    height: 230px;
    background-color: var(--beige-dark);
    font-size: 20px;
    border-radius: 20px;
    padding-left: 10px;
    padding-top: 10px;
    margin: 15px;
`;
const UserItem = styled.div`
    display: grid;
    grid-template-columns: 200px 20px;
    margin: 5px 0px;
`;
const UserName = styled.div``;

function Participant() {
    return (
        <Container>
            <div className="header">
                <h3>참가자</h3>
            </div>
            <br />
            <div className="container-body">
                {/* {subs &&
                    subs.map((user, index) => (
                        <UserItem key={index}>
                            <UserName>{} </UserName>
                            {user === host ? null : (
                                <Button width="20px" height="20px">
                                    x
                                </Button>
                            )}
                        </UserItem>
                    ))} */}
            </div>
        </Container>
    );
}

export default Participant;
