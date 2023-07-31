import React, { useRef } from "react";
import { styled } from "styled-components";

const StyledVideo = styled.video`
    width: ${(props) => props.width ?? "20%"};
    height: ${(props) => props.height ?? "150px"};
    border: ${(props) => props.border ?? "0px"};
    object-fit: ${(props) => props.objectfit ?? "fill"};
`;
const VideoComponent = (props) => {
    // styled-components settings
    const { width, height, border, objectfit } = props;

    // video calls
    const videoRef = useRef(null);
    const constraints = {
        audio: true,
        video: true,
    };
    // video on
    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = stream;
        }
    };
    // video off
    const endVideo = async () => {
        videoRef.current.srcObject = null;
    };
    return (
        <div>
            <StyledVideo
                width={width}
                height={height}
                border={border}
                ref={videoRef}
                object-fit={objectfit}
                autoPlay
            />
            <button onClick={startVideo}>start</button>
            <button onClick={endVideo}>end</button>
        </div>
    );
};

export default VideoComponent;
