"use client";

import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection, DataConnection } from "peerjs";

interface VideoCallProps {
  role: "CEO" | "Manager" | "Employee";
}

// Define the expected shape of the data object
interface TextMessage {
  type: "text";
  text: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ role }) => {
  const ceoVideoRef = useRef<HTMLVideoElement>(null);
  const managerVideoRef = useRef<HTMLVideoElement>(null);
  const employeeVideoRef = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [screenSharing, setScreenSharing] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Disconnected");
  const [sharedText, setSharedText] = useState<string>("");
  const localStreamRef = useRef<MediaStream | null>(null);
  const mediaConnectionsRef = useRef<Map<string, MediaConnection>>(new Map());
  const dataConnectionsRef = useRef<Map<string, DataConnection>>(new Map());

  useEffect(() => {
    console.log(`[${role}] Initializing PeerJS`);
    const peerInstance = new Peer(role, {
      host: "0.peerjs.com",
      port: 443,
      path: "/",
      secure: true,
    });

    peerInstance.on("open", (id: string) => {
      console.log(`[${role}] PeerJS ID: ${id}`);
      setStatus("Connected to PeerJS server");
      setPeer(peerInstance);

      const remoteRoles = ["CEO", "Manager", "Employee"].filter((r) => r !== role);
      remoteRoles.forEach((remoteRole) => {
        const conn = peerInstance.connect(remoteRole);
        conn.on("open", () => {
          console.log(`[${role}] Data connection opened with ${remoteRole}`);
          dataConnectionsRef.current.set(remoteRole, conn);
        });
        conn.on("error", (err: Error) => {
          console.error(`[${role}] Data connection error with ${remoteRole}:`, err);
        });
      });
    });

    peerInstance.on("call", (call: MediaConnection) => {
      console.log(`[${role}] Receiving call from ${call.peer}`);
      if (localStreamRef.current) {
        console.log(`[${role}] Answering with tracks:`, localStreamRef.current.getTracks());
        call.answer(localStreamRef.current);
        handleCall(call);
      } else {
        console.warn(`[${role}] No local stream to answer call`);
      }
    });

    peerInstance.on("connection", (conn: DataConnection) => {
      conn.on("data", (data: unknown) => {
        // Type guard to ensure data matches TextMessage
        if (
          typeof data === "object" &&
          data !== null &&
          "type" in data &&
          (data as any).type === "text" &&
          "text" in data
        ) {
          const message = data as TextMessage;
          console.log(`[${role}] Received text from ${conn.peer}: ${message.text}`);
          setSharedText(message.text);
        }
      });
      conn.on("open", () => {
        console.log(`[${role}] Data connection opened with ${conn.peer}`);
        dataConnectionsRef.current.set(conn.peer, conn);
      });
      conn.on("error", (err: Error) => {
        console.error(`[${role}] Data connection error with ${conn.peer}:`, err);
      });
    });

    peerInstance.on("error", (err: Error) => {
      console.error(`[${role}] PeerJS error:`, err);
      setStatus(`Error: ${err.message}`);
    });

    return () => {
      console.log(`[${role}] Cleaning up PeerJS`);
      peerInstance.destroy();
      disconnectCall();
    };
  }, [role]);

  const startVideo = async (): Promise<MediaStream> => {
    try {
      console.log(`[${role}] Requesting camera and microphone`);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log(`[${role}] Video stream obtained with tracks:`, stream.getTracks());
      localStreamRef.current = stream;
      const localVideoRef =
        role === "CEO" ? ceoVideoRef : role === "Manager" ? managerVideoRef : employeeVideoRef;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch((e) => console.error(`[${role}] Local play error:`, e));
        console.log(`[${role}] Local video set`);
      }
      return stream;
    } catch (error) {
      console.error(`[${role}] Error starting video:`, error);
      setStatus("Error: Camera/Microphone access denied");
      throw error;
    }
  };

  const startScreenShare = async (): Promise<void> => {
    try {
      console.log(`[${role}] Starting screen share`);
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      console.log(`[${role}] Screen share stream obtained:`, stream.getTracks());
      localStreamRef.current = stream;
      if (ceoVideoRef.current) {
        ceoVideoRef.current.srcObject = stream;
      }
      setScreenSharing(true);

      mediaConnectionsRef.current.forEach((call) => {
        const sender = call.peerConnection?.getSenders().find((s) => s.track?.kind === "video");
        if (sender) {
          sender.replaceTrack(stream.getVideoTracks()[0]);
          console.log(`[${role}] Replaced video track for ${call.peer}`);
        }
      });

      stream.getVideoTracks()[0].onended = () => {
        console.log(`[${role}] Screen share ended`);
        stopScreenShare();
      };
    } catch (error) {
      console.error(`[${role}] Error starting screen share:`, error);
      setStatus("Error: Screen share failed");
    }
  };

  const stopScreenShare = async (): Promise<void> => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      console.log(`[${role}] Stopped screen share tracks`);
    }
    const newStream = await startVideo();
    console.log(`[${role}] Restored stream tracks:`, newStream.getTracks());
    mediaConnectionsRef.current.forEach((call) => {
      const sender = call.peerConnection?.getSenders().find((s) => s.track?.kind === "video");
      if (sender && localStreamRef.current) {
        sender.replaceTrack(localStreamRef.current.getVideoTracks()[0]);
        console.log(`[${role}] Restored video track for ${call.peer}`);
      }
    });
    setScreenSharing(false);
  };

  const handleCall = (call: MediaConnection): void => {
    call.on("stream", (remoteStream: MediaStream) => {
      console.log(`[${role}] Received stream from ${call.peer} with tracks:`, remoteStream.getTracks());
      if (call.peer === "CEO" && ceoVideoRef.current) {
        ceoVideoRef.current.srcObject = remoteStream;
        ceoVideoRef.current.play().catch((e) => console.error(`[${role}] CEO play error:`, e));
      } else if (call.peer === "Manager" && managerVideoRef.current) {
        managerVideoRef.current.srcObject = remoteStream;
        managerVideoRef.current.play().catch((e) => console.error(`[${role}] Manager play error:`, e));
      } else if (call.peer === "Employee" && employeeVideoRef.current) {
        employeeVideoRef.current.srcObject = remoteStream;
        employeeVideoRef.current.play().catch((e) => console.error(`[${role}] Employee play error:`, e));
      }
    });

    call.on("error", (err: Error) => {
      console.error(`[${role}] Call error with ${call.peer}:`, err);
      setStatus(`Error with ${call.peer}`);
    });

    call.on("close", () => {
      console.log(`[${role}] Call with ${call.peer} closed`);
      mediaConnectionsRef.current.delete(call.peer);
    });

    mediaConnectionsRef.current.set(call.peer, call);
  };

  const startCall = async (): Promise<void> => {
    if (!peer) {
      console.warn(`[${role}] Peer not initialized yet`);
      return;
    }
    try {
      setStatus("Connecting...");
      console.log(`[${role}] Starting call`);
      const stream = await startVideo();
      console.log(`[${role}] Stream to send:`, stream.getTracks());
      const remoteRoles = ["CEO", "Manager", "Employee"].filter((r) => r !== role);

      remoteRoles.forEach((remoteRole) => {
        console.log(`[${role}] Calling ${remoteRole}`);
        const call = peer.call(remoteRole, stream);
        if (call) {
          handleCall(call);
        } else {
          console.warn(`[${role}] Failed to initiate call to ${remoteRole}`);
        }
      });

      setCallStarted(true);
      console.log(`[${role}] Call started`);
    } catch (error) {
      console.error(`[${role}] Start call error:`, error);
      setStatus("Error: Failed to start call");
    }
  };

  const disconnectCall = (): void => {
    console.log(`[${role}] Disconnecting call`);
    mediaConnectionsRef.current.forEach((call) => {
      call.close();
      console.log(`[${role}] Closed connection to ${call.peer}`);
    });
    dataConnectionsRef.current.forEach((conn) => {
      conn.close();
      console.log(`[${role}] Closed data connection to ${conn.peer}`);
    });
    mediaConnectionsRef.current.clear();
    dataConnectionsRef.current.clear();
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      console.log(`[${role}] Stopped local stream`);
      localStreamRef.current = null;
    }
    [ceoVideoRef, managerVideoRef, employeeVideoRef].forEach((ref) => {
      if (ref.current) ref.current.srcObject = null;
    });
    setCallStarted(false);
    setScreenSharing(false);
    setStatus("Disconnected");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newText = e.target.value;
    setSharedText(newText);
    console.log(`[${role}] Broadcasting shared text: ${newText}`);
    const message: TextMessage = { type: "text", text: newText };
    dataConnectionsRef.current.forEach((conn) => {
      conn.send(message);
    });
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
            playsInline
            muted={role === "CEO"}
            className="w-72 h-48 border-2 border-gray-700 rounded-lg bg-black"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg mb-2">Manager</h3>
          <video
            ref={managerVideoRef}
            autoPlay
            playsInline
            muted={role === "Manager"}
            className="w-72 h-48 border-2 border-gray-700 rounded-lg bg-black"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg mb-2">Employee</h3>
          <video
            ref={employeeVideoRef}
            autoPlay
            playsInline
            muted={role === "Employee"}
            className="w-72 h-48 border-2 border-gray-700 rounded-lg bg-black"
          />
        </div>
      </div>

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
          <>
            <button
              onClick={disconnectCall}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Disconnect
            </button>
            {role === "CEO" && (
              <button
                onClick={screenSharing ? stopScreenShare : startScreenShare}
                className={`${
                  screenSharing ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
                } text-white font-semibold py-2 px-6 rounded-lg transition-colors`}
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