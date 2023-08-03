import VideoBoxing from "../../components/VideoBoxing";
import styled from "styled-components";
import {
    DescBox,
    DescContainer,
    VideoBox,
    VideoContainer,
} from "../../components/layout/qnaPage";
// import Timer from "../../components/Timer";

const Container = styled.div`
    height: 100%;
    margin: 0;
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
            {/* <Timer /> */}
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
