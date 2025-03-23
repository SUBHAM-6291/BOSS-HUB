"use client";

import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection, DataConnection } from "peerjs";

interface VideoCallProps {
  role: "CEO" | "Manager" | "Employee";
}

const VideoCall: React.FC<VideoCallProps> = ({ role }) => {
  const ceoVideoRef = useRef<HTMLVideoElement>(null);
  const managerVideoRef = useRef<HTMLVideoElement>(null);
  const employeeVideoRef = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [status, setStatus] = useState("Disconnected");
  const localStreamRef = useRef<MediaStream | null>(null);
  const mediaConnectionsRef = useRef<Map<string, MediaConnection>>(new Map());
  const dataConnectionsRef = useRef<Map<string, DataConnection>>(new Map());

  useEffect(() => {
    const peerInstance = new Peer(role, {
      host: "0.peerjs.com",
      port: 443,
      secure: true,
    });

    peerInstance.on("open", () => {
      setStatus("Connected to PeerJS server");
      setPeer(peerInstance);
      connectToRemoteRoles(peerInstance);
    });

    peerInstance.on("call", (call) => {
      if (localStreamRef.current) {
        call.answer(localStreamRef.current);
        handleCall(call);
      } else {
        setStatus("Error: No local stream");
      }
    });

    peerInstance.on("connection", (conn) => {
      conn.on("open", () => dataConnectionsRef.current.set(conn.peer, conn));
      conn.on("error", () => setStatus(`Error with ${conn.peer}`));
    });

    peerInstance.on("error", (err) => setStatus(`Error: ${err.message}`));

    return () => {
      peerInstance.destroy();
      disconnectCall();
    };
  }, [role]);

  const connectToRemoteRoles = (peerInstance: Peer) => {
    const remoteRoles = ["CEO", "Manager", "Employee"].filter((r) => r !== role);
    remoteRoles.forEach((remoteRole) => {
      const conn = peerInstance.connect(remoteRole);
      conn.on("open", () => dataConnectionsRef.current.set(remoteRole, conn));
      conn.on("error", () => setStatus(`Error connecting to ${remoteRole}`));
    });
  };

  const startVideo = async (): Promise<MediaStream> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      const localVideoRef = getLocalVideoRef();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
      }
      return stream;
    } catch {
      setStatus("Error: Camera/Microphone access denied");
      throw new Error("Media access failed");
    }
  };

  const startScreenShare = async (): Promise<void> => {
    if (role !== "CEO") return;
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      localStreamRef.current = stream;
      if (ceoVideoRef.current) ceoVideoRef.current.srcObject = stream;
      setScreenSharing(true);

      mediaConnectionsRef.current.forEach((call) => {
        const sender = call.peerConnection?.getSenders().find((s) => s.track?.kind === "video");
        if (sender) sender.replaceTrack(stream.getVideoTracks()[0]);
      });

      stream.getVideoTracks()[0].onended = stopScreenShare;
    } catch {
      setStatus("Error: Screen share failed");
    }
  };

  const stopScreenShare = async (): Promise<void> => {
    if (localStreamRef.current) localStreamRef.current.getTracks().forEach((track) => track.stop());
    await startVideo();
    mediaConnectionsRef.current.forEach((call) => {
      const sender = call.peerConnection?.getSenders().find((s) => s.track?.kind === "video");
      if (sender && localStreamRef.current) sender.replaceTrack(localStreamRef.current.getVideoTracks()[0]);
    });
    setScreenSharing(false);
  };

  const handleCall = (call: MediaConnection): void => {
    call.on("stream", (remoteStream) => {
      const videoRef = getVideoRefForPeer(call.peer);
      if (videoRef.current) {
        videoRef.current.srcObject = remoteStream;
        videoRef.current.play();
      }
    });

    call.on("error", () => setStatus(`Error with ${call.peer}`));
    call.on("close", () => mediaConnectionsRef.current.delete(call.peer));
    mediaConnectionsRef.current.set(call.peer, call);
  };

  const startCall = async (): Promise<void> => {
    if (!peer) {
      setStatus("Error: Peer not initialized");
      return;
    }
    try {
      setStatus("Connecting...");
      const stream = await startVideo();
      const remoteRoles = ["CEO", "Manager", "Employee"].filter((r) => r !== role);
      remoteRoles.forEach((remoteRole) => {
        const call = peer.call(remoteRole, stream);
        if (call) handleCall(call);
      });
      setCallStarted(true);
    } catch {
      setStatus("Error: Failed to start call");
    }
  };

  const disconnectCall = (): void => {
    mediaConnectionsRef.current.forEach((call) => call.close());
    dataConnectionsRef.current.forEach((conn) => conn.close());
    mediaConnectionsRef.current.clear();
    dataConnectionsRef.current.clear();
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    [ceoVideoRef, managerVideoRef, employeeVideoRef].forEach((ref) => {
      if (ref.current) ref.current.srcObject = null;
    });
    setCallStarted(false);
    setScreenSharing(false);
    setStatus("Disconnected");
  };

  const getLocalVideoRef = () =>
    role === "CEO" ? ceoVideoRef : role === "Manager" ? managerVideoRef : employeeVideoRef;

  const getVideoRefForPeer = (peerId: string) =>
    peerId === "CEO" ? ceoVideoRef : peerId === "Manager" ? managerVideoRef : employeeVideoRef;

  // All video refs including the user's own
  const allVideoRefs = [ceoVideoRef, managerVideoRef, employeeVideoRef];

  return (
    <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-semibold mb-6">{role} Video Conference</h1>
      <p className="text-gray-400 mb-8">Status: {status}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-5xl">
        {allVideoRefs.map((ref, index) => {
          const label = ref === ceoVideoRef ? "CEO" : ref === managerVideoRef ? "Manager" : "Employee";
          return (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-xl font-medium mb-2">{label}</h3>
              <video
                ref={ref}
                autoPlay
                playsInline
                muted={role === label} // Mute local video to avoid feedback
                className="w-full max-w-sm h-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg"
              />
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        {!callStarted ? (
          <button
            onClick={startCall}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md"
          >
            Start Call
          </button>
        ) : (
          <>
            <button
              onClick={disconnectCall}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md"
            >
              Disconnect
            </button>
            {role === "CEO" && (
              <button
                onClick={screenSharing ? stopScreenShare : startScreenShare}
                className={`${
                  screenSharing ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
                } text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md`}
              >
                {screenSharing ? "Stop Sharing" : "Share Screen"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCall;