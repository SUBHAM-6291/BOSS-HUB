import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients: Map<string, WebSocket> = new Map();

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  ws.on("message", (message: string | Buffer) => {
    const data = JSON.parse(message.toString());
    if (data.type === "register") {
      clients.set(data.role, ws);
      console.log(`${data.role} registered`);
      broadcast({ type: "clients", roles: Array.from(clients.keys()) });
    } else if (data.type === "offer" || data.type === "answer" || data.type === "candidate") {
      const target = clients.get(data.to);
      if (target) target.send(JSON.stringify(data));
    }
  });

  ws.on("close", () => {
    for (const [role, client] of clients) {
      if (client === ws) {
        clients.delete(role);
        console.log(`${role} disconnected`);
        broadcast({ type: "clients", roles: Array.from(clients.keys()) });
        break;
      }
    }
  });
});

function broadcast(data: any) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data));
  });
}

console.log("WebSocket server running on ws://localhost:8080");