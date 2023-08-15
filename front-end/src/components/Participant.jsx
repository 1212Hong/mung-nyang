import React from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { useSelector } from "react-redux";

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

function Participant({ publisher, subscribers }) {
    const openvidu = useSelector((state) => state.openvidu);
    const { owner } = openvidu;
    console.log(owner);
    console.log(publisher);
    console.log(subscribers);
    return (
        <Container>
            <div className="header">
                <h3>참가자</h3>
            </div>
            <br />
            <div className="container-body">
                <UserItem>
                    <UserName>{publisher.stream.connection.data}</UserName>
                </UserItem>
                {subscribers.map((item, key) => (
                    <UserItem key={key}>
                        <UserName>{item.stream.connection.data}</UserName>
                        {owner ? (
                            <Button width="20px" height="20px">
                                x
                            </Button>
                        ) : (
                            ""
                        )}
                    </UserItem>
                ))}
            </div>
        </Container>
    );
}

export default Participant;
