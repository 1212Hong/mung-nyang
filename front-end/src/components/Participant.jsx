import React from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { useSelector } from "react-redux";
import { SubText } from "./layout/common";

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

function Participant({ publisher }) {
    const openvidu = useSelector((state) => state.openvidu);
    const { owner, session, subscribers } = openvidu;

    console.log(owner);
    console.log(publisher);
    console.log(subscribers);

    const dropUser = (userName) => {
        session.signal({
            data: userName,
            to: [],
            type: "dropUser",
        });
    };

    return (
        <Container>
            <div className="header">
                <h3>참가자</h3>
            </div>
            <br />
            <div className="container-body">
                <UserItem>
                    <SubText>{publisher.stream.connection.data}</SubText>
                </UserItem>
                {subscribers.map((item, key) => (
                    <UserItem key={key}>
                        <SubText>{item.stream.connection.data}</SubText>{" "}
                        {/* {owner ? (
                            <Button
                                width="25px"
                                height="22px"
                                type="icon"
                                shadow="none"
                                onClick={() =>
                                    dropUser(item.stream.connection.data)
                                }
                            >
                                X
                            </Button>
                        ) : (
                            ""
                        )} */}
                    </UserItem>
                ))}
            </div>
        </Container>
    );
}

export default Participant;
