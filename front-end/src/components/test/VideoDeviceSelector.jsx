import React, { useState, useEffect } from "react";

const VideoDeviceSelector = ({ onDeviceSelected }) => {
    const [videoDevices, setVideoDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
        const getAvailableVideoDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(
                    (device) => device.kind === "videoinput",
                );
                setVideoDevices(videoDevices);
                setSelectedDevice(videoDevices[0] || null);
            } catch (error) {
                console.error("Error fetching video devices:", error);
            }
        };

        getAvailableVideoDevices();
    }, []);

    const handleDeviceChange = (event) => {
        const deviceId = event.target.value;
        const selectedDevice = videoDevices.find(
            (device) => device.deviceId === deviceId,
        );
        setSelectedDevice(selectedDevice);
        onDeviceSelected(selectedDevice);
    };

    return (
        <div>
            <label htmlFor="videoDevices">비디오 선택 </label>
            <select
                id="videoDevices"
                value={selectedDevice?.deviceId || ""}
                onChange={handleDeviceChange}
            >
                {videoDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default VideoDeviceSelector;
