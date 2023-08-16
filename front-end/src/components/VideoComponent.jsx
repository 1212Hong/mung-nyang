import React, { useRef, useEffect } from "react";
import { styled } from "styled-components";

const StyledVideo = styled.video`
    width: ${(props) => props.width ?? "20%"};
    height: ${(props) => props.height ?? "150px"};
    border: ${(props) => props.border ?? "0px"};
    object-fit: ${(props) => props.objectfit ?? "fill"};
    border-radius: 20px;
`;

const VideoComponent = (props) => {
    // styled-components settings
    const { width, height, border, objectfit, streamManager } = props;
    // video calls
    const videoRef = useRef(null);
    const constraints = {
        audio: true,
        video: true,
    };

    // video on
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints,
            );
            if (videoRef.current && !videoRef.current.srcObject) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };

    // video off
    const endVideo = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    // Automatically start video on component mount
    useEffect(() => {
        // console.log(streamManager);
        if (streamManager && !!videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        } else {
            startVideo();
        }
    }, []);

    return (
        <StyledVideo
            width={width}
            height={height}
            border={border}
            ref={videoRef}
            objectfit={objectfit}
            autoPlay
        />
    );
};

export default VideoComponent;
