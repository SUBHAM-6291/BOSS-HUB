"use client";

import { useRef } from "react";
import { useVideoCallLogic } from "@/Backend/server/backend/video";

interface VideoCallProps {
  role: "CEO" | "Manager" | "Employee";
}

const VideoCall: React.FC<VideoCallProps> = ({ role }) => {
  const videos = {
    CEO: useRef<HTMLVideoElement>(null),
    Manager: useRef<HTMLVideoElement>(null),
    Employee: useRef<HTMLVideoElement>(null),
  };

  const { inCall, startCall, endCall } = useVideoCallLogic({
    role,
    videoRefs: videos,
  });

  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-xl">{role} Call</h1>
      <div className="flex gap-4 mt-4">
        {Object.entries(videos).map(([name, videoRef]) => (
          <div key={name}>
            <h3>{name}</h3>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={role === name}
              className="w-64 h-48 bg-gray-900"
            />
          </div>
        ))}
      </div>
      <button
        onClick={inCall ? endCall : startCall}
        className={`${inCall ? "bg-red-500" : "bg-blue-500"} text-white p-2 mt-4 rounded`}
      >
        {inCall ? "End" : "Start"}
      </button>
    </div>
  );
};

export default VideoCall;