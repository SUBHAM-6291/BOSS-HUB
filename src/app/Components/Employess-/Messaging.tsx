"use client";

import { useEffect, useRef, useState } from "react";
import signalingStore from "@/Backend/tools/signalingStore"; // Shared signaling store

interface VideoCallProps {
  role: "Manager" | "Employee";
}

const VideoCall: React.FC<VideoCallProps> = ({ role }) => {
  const ceoVideoRef = useRef<HTMLVideoElement>(null);
  const managerVideoRef = useRef<HTMLVideoElement>(null);
  const employeeVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnections, setPeerConnections] = useState<RTCPeerConnection[]>([]);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Disconnected");
  const [sharedText, setSharedText] = useState<string>(""); // State for shared input text

  const configuration: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const startVideo = async (): Promise<MediaStream> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const localVideoRef = role === "Manager" ? managerVideoRef : employeeVideoRef;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      return stream;
    } catch (error) {
      console.error("Error starting video:", error);
      setStatus("Error: Camera/Microphone access denied");
      throw error;
    }
  };

  const createPeerConnection = (localStream: MediaStream, remoteRole: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    pc.ontrack = (event) => {
      if (remoteRole === "CEO" && ceoVideoRef.current) {
        ceoVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalingStore.iceCandidates[role.toLowerCase() as "ceo" | "manager" | "employee"].push(event.candidate.toJSON());
        console.log(`${role} ICE Candidate for ${remoteRole}:`, event.candidate);
      }
    };

    pc.onconnectionstatechange = () => {
      setStatus(pc.connectionState);
      if (pc.connectionState === "failed") reconnect(pc, localStream, remoteRole);
    };

    return pc;
  };

  const startCall = async () => {
    try {
      setStatus("Connecting...");
      const localStream = await startVideo();
      const ceoPC = createPeerConnection(localStream, "CEO");

      const ceoOffer = signalingStore.ceoOffer;
      if (ceoOffer) {
        await ceoPC.setRemoteDescription(new RTCSessionDescription(ceoOffer));
        const answer = await ceoPC.createAnswer();
        await ceoPC.setLocalDescription(answer);
        if (role === "Manager") signalingStore.managerAnswer = answer;
        else signalingStore.employeeAnswer = answer;
        console.log(`${role} Answer for CEO:`, answer);
      }

      setPeerConnections([ceoPC]);
      setCallStarted(true);

      const checkIce = setInterval(() => {
        signalingStore.iceCandidates.ceo.forEach((candidate) =>
          ceoPC.addIceCandidate(new RTCIceCandidate(candidate)).catch((e) =>
            console.error("ICE Error:", e)
          )
        );
        if (ceoPC.signalingState === "stable") clearInterval(checkIce);
      }, 1000);
    } catch (error) {
      console.error("Start call error:", error);
      setStatus("Error: Failed to start call");
    }
  };

  const disconnectCall = () => {
    peerConnections.forEach((pc) => pc.close());
    setPeerConnections([]);
    setCallStarted(false);
    setStatus("Disconnected");
    const localVideoRef = role === "Manager" ? managerVideoRef : employeeVideoRef;
    if (localVideoRef.current?.srcObject) {
      (localVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }
    if (ceoVideoRef.current) ceoVideoRef.current.srcObject = null;
    signalingStore.iceCandidates[role.toLowerCase() as "ceo" | "manager" | "employee"] = [];
  };

  const reconnect = (pc: RTCPeerConnection, localStream: MediaStream, remoteRole: string) => {
    console.log(`Reconnecting to ${remoteRole}...`);
    pc.close();
    const newPC = createPeerConnection(localStream, remoteRole);
    setPeerConnections((prev) => [...prev.filter((p) => p !== pc), newPC]);
    startCall(); // Attempt to re-establish the call
  };

  // Sync shared text with signalingStore
  useEffect(() => {
    // Simulate syncing with signalingStore (assuming it has a sharedText property)
    if (!signalingStore.sharedText) signalingStore.sharedText = "";
    setSharedText(signalingStore.sharedText);

    const textSyncInterval = setInterval(() => {
      if (signalingStore.sharedText !== sharedText) {
        setSharedText(signalingStore.sharedText);
      }
    }, 500); // Check every 500ms for updates

    return () => clearInterval(textSyncInterval);
  }, [sharedText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setSharedText(newText);
    signalingStore.sharedText = newText; // Update shared store
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{role} Video Conference</h1>
      <p className="text-center mb-4">Status: {status}</p>

      <div className="flex justify-center gap-6 flex-wrap mb-8">
        <div className="text-center">
          <h3 className="text-lg mb-2">CEO</h3>
          <video
            ref={ceoVideoRef}
            autoPlay
            className="w-72 h-48 border-2 border-gray-700 rounded-lg bg-black"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg mb-2">Manager</h3>
          <video
            ref={managerVideoRef}
            autoPlay
            muted={role === "Manager"}
            className="w-72 h-48 border-2 border-gray-700 rounded-lg bg-black"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg mb-2">Employee</h3>
          <video
            ref={employeeVideoRef}
            autoPlay
            muted={role === "Employee"}
            className="w-72 h-48 border-2 border-gray-700 rounded-lg bg-black"
          />
        </div>
      </div>

      {/* Shared Text Input and Display */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-800 p-4 rounded-lg w-72">
          <input
            type="text"
            value={sharedText}
            onChange={handleTextChange}
            placeholder="Type here..."
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
          />
          <p className="mt-2 text-sm">Shared Text: {sharedText}</p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!callStarted ? (
          <button
            onClick={startCall}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={disconnectCall}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;