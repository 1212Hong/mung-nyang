import error from "../assets/img/error.png";
import detective from "../assets/img/detective.png";
import {
    Container,
    LeftBox,
    RightBox,
    ImgItem,
    TitleItem,
    SubtitleItem,
    DescriptionItem,
    Group,
} from "../components/layout/error";

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
                    <TitleItem>404</TitleItem>
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
