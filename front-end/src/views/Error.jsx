import { styled } from "styled-components";
import error from "../assets/img/error.png";
import detective from "../assets/img/detective.png";

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const LeftBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const RightBox = styled.div``;
const ImgItem = styled.div`
    margin-top: 70px;
`;
const TitleItemx = styled.div`
    margin-top: 20px;
    font-size: 64px;
`;
const SubtitleItem = styled.div`
    font-size: 32px;
    margin-bottom: 20px;
`;
const DescriptionItem = styled.div`
    font-size: 16px;
    margin-top: 10px;
`;
const Group = styled.div`
    height: 200px;
    padding: 0px 40px;
    background-color: var(--dusty-pink-white);
    border-radius: 20px;
`;

const imgSrc1 = error;
const imgSrc2 = detective;

const Error = () => {
    return (
        <Container>
            <LeftBox>
                <ImgItem>
                    <img width={200} src={imgSrc2} alt="" />
                </ImgItem>
                <Group>
                    <TitleItemx>404</TitleItemx>
                    <SubtitleItem>Page Not Found</SubtitleItem>
                    <DescriptionItem>
                        Sorry, you requested a page that cannot be found at this
                        time.
                    </DescriptionItem>
                    <DescriptionItem>
                        죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
                    </DescriptionItem>
                </Group>
            </LeftBox>
            <RightBox>
                <img height={800} src={imgSrc1} alt="" />
            </RightBox>
        </Container>
    );
};

export default Error;
