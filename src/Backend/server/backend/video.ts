import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "peerjs";

interface VideoCallLogicProps {
  role: "CEO" | "Manager" | "Employee";
  videoRefs: Record<
    "CEO" | "Manager" | "Employee",
    React.RefObject<HTMLVideoElement | null>
  >;
}

export const useVideoCallLogic = ({ role, videoRefs }: VideoCallLogicProps) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [inCall, setInCall] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const callsRef = useRef<Map<string, MediaConnection>>(new Map());

  useEffect(() => {
    const peerInstance = new Peer(role, {
      host: "0.peerjs.com",
      port: 443,
      secure: true,
    });
    peerInstance.on("open", () => setPeer(peerInstance));
    peerInstance.on("call", (call) => {
      if (streamRef.current) {
        call.answer(streamRef.current);
        handleCall(call);
      }
    });
    return () => {
      peerInstance.destroy();
      endCall();
    };
  }, [role]);

  const startVideo = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const localVideo = videoRefs[role].current;
    if (localVideo) localVideo.srcObject = streamRef.current;
  };

  const handleCall = (call: MediaConnection) => {
    call.on("stream", (remoteStream) => {
      const videoRef = videoRefs[call.peer as keyof typeof videoRefs].current;
      if (videoRef) videoRef.srcObject = remoteStream;
    });
    callsRef.current.set(call.peer, call);
  };

  const startCall = async () => {
    if (!peer) return;
    await startVideo();
    ["CEO", "Manager", "Employee"]
      .filter((r) => r !== role)
      .forEach((r) => {
        const call = peer.call(r, streamRef.current!);
        if (call) handleCall(call);
      });
    setInCall(true);
  };

  const endCall = () => {
    callsRef.current.forEach((call) => call.close());
    callsRef.current.clear();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    Object.values(videoRefs).forEach(
      (ref) => ref.current && (ref.current.srcObject = null)
    );
    setInCall(false);
  };

  return { inCall, startCall, endCall, streamRef };
};
