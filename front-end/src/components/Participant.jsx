import React from "react";
import { styled } from "styled-components";

function Participant({ user_list, host }) {
    const Container = styled.div`
        width: 250px;
        height: 230px;
        background-color: ${`var(--beige-dark)`};
        font-size: 24px;
        border-radius: 20px;
        padding-left: 10px;
        padding-top: 10px;
        margin: 15px;
    `;

    return (
        <Container>
            <div className="header">
                <h1>참가자</h1>
            </div>
            <br />
            <div className="container-body">
                {user_list.map((user, index) => (
                    <React.Fragment key={index}>
                        <span>{user} </span>
                        {user === host ? null : <button>X</button>}
                        <br />
                    </React.Fragment>
                ))}
            </div>
        </Container>
    );
}

export default Participant;
