import styled from "styled-components";

const Box = styled.div`
    background-color: ${`var(--beige)`};
    width: 400px;
    height: 500px;
    border: 1px solid ${`var(--black)`};
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    text-align: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
const Icon = styled.div`
    margin-top: 100px;
    margin-bottom: 50px;
    position: relative;
    padding: 10px;
    transform: translate(-50%, -50%);
    animation: rotate 2s infinite;
    @keyframes rotate {
        0%,
        100% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(90deg);
        }
        75% {
            transform: rotate(0deg);
        }
    }
`;
const Text = styled.div`
    font-size: 32px;
    color: ${`var(--black)`};
    margin-left: 70px;
    margin-right: 70px;
`;
const Card = (props) => {
    const { imageSrc, description } = props;
    return (
        <Box>
            <Icon>
                <img src={imageSrc} alt="" />
            </Icon>
            <Text>{description}</Text>
        </Box>
    );
};

export default Card;
