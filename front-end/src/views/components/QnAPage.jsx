import VideoBoxing from "../../components/VideoBoxing";
import styled from "styled-components";
import Timer from "../../components/Timer";
const Container = styled.div`
    height: 100%;
    margin: 0;
`;
const DescContainer = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
`;
const VideoContainer = styled.div`
    width: 100%;
    height: 38%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;
const VideoBox = styled.div`
    margin: auto;
    width: 30%;
    height: 80%;
    box-sizing: border-box;
    border-radius: 5px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
const DescBox = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 0 30px;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    background: var(--vanilla-cream);
    box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.5);
`;
function QnAPage() {
    const user_list = [
        "권영재",
        "김대홍",
        "손임현",
        "이민규",
        "홍주영",
        "이현우",
    ];
    const upside =
        user_list.length % 2 === 1
            ? parseInt(user_list.length / 2) + 1
            : user_list.length / 2;

    const upside_list = user_list.slice(0, upside);
    const downside_list = user_list.slice(upside, user_list.length);

    return (
        <Container>
            <Timer />
            <VideoContainer>
                {upside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <VideoBoxing width={"100%"} height={"180px"} />
                        {user}
                    </VideoBox>
                ))}
            </VideoContainer>
            <DescContainer>
                <DescBox>정답자의 질문에 답해주세요. </DescBox>
            </DescContainer>
            <VideoContainer>
                {downside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <VideoBoxing width={"100%"} height={"180px"} />
                        {user}
                    </VideoBox>
                ))}
            </VideoContainer>
        </Container>
    );
}
export default QnAPage;
